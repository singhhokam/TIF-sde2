const { Snowflake } = require("@theinternetfolks/snowflake");
const Community = require("../models/community");
const Member = require("../models/member");
const Role = require("../models/role");
const User = require("../models/user");
const { validateCommunityName } = require("../validations/validator");

async function createCommunity(name, userId) {
  const valid = validateCommunityName(name);
  if (valid) {
    const communityObj = {
      id: Snowflake.generate({ timestamp: Date.now() }),
      name: name,
      slug: name.split(" ").join("-"),
      userId: userId,
    };
    const communityExists = await Community.findOne({ where: { name: name } });
    if (communityExists) {
      throw {
        message: "community already exists.",
        code: "RESOURCE_EXISTS",
      };
    }
    const community = await Community.create(communityObj);
    /* Role is not dependent on any other model so we can use single "Community Admin" , 
    "Community Moderator" or "Community User" for any member we create, it can be fixed. 
    In the documentaion it is stated that Roles(name) must be unique, if so then what other roles there might be 
    assigned to members, it is not clearly stated in docs so I am not creating new and using existing one.
    */
    const [role, created] = await Role.findOrCreate({
      where: { name: "Community Admin" },
      defaults: {
        id: Snowflake.generate({ timestamp: Date.now() }),
        name: "Community Admin",
        scopes: "admin",
      },
    });
    const member = await Member.create({
      id: Snowflake.generate({ timestamp: Date.now() }),
      communityId: community.id,
      userId: userId,
      roleId: role.id,
    });
    return { data: community };
  }
}

async function getAllCommunities() {
  const communities = await Community.findAll({
    include: [
      {
        as: "owner",
        model: User,
        attributes: ["id", "name"],
      },
    ],
    attributes: {
      exclude: ["userId"],
    },
  });
  return {
    meta: {
      total: communities.length,
      pages: Math.ceil(communities.length / 10),
      page: Math.ceil(communities.length / 10),
    },
    data: communities,
  };
}

async function getAllMembersByCommunity(id) {
  if (typeof id != "number" || Number(id) == "NaN") {
    throw {
      param: "id",
      message: "Invalid community id",
      code: "INVALID_PARAMETERS",
    };
  }
  const members = await Member.findAll({
    where: { communityId: id },
    attributes: {
      exclude: ["userId", "roleId"],
    },
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "name"],
      },
      {
        model: Role,
        as: "role",
        attributes: ["id", "name"],
      },
    ],
  });
  return {
    meta: {
      total: members.length,
      pages: Math.ceil(members.length / 10),
      page: Math.ceil(members.length / 10),
    },
    data: members,
  };
}

async function getMyOwnedCommunity(userId) {
  const communities = await Community.findAll({
    attributes: {
      include: [["userId", "owner"]],
      exclude: ["userId"],
    },
    where: { userId: userId },
  });
  return {
    meta: {
      total: communities.length,
      pages: Math.ceil(communities.length / 10),
      page: Math.ceil(communities.length / 10),
    },
    data: communities,
  };
}

async function getMyJoinedCommunity(userId) {
  const communities = await Community.findAll({
    include: [
      {
        model: Member,
        as: "members",
        where: {
          userId: userId,
        },
        required: false,
        attributes: [],
      },
      {
        model: User,
        as: "owner",
        attributes: ["id", "name"],
      },
    ],
    attributes: {
      exclude: ["userId"],
    },
  });
  return {
    meta: {
      total: communities.length,
      pages: Math.ceil(communities.length / 10),
      page: Math.ceil(communities.length / 10),
    },
    data: communities,
  };
}

module.exports = {
  getAllCommunities,
  createCommunity,
  getAllMembersByCommunity,
  getMyOwnedCommunity,
  getMyJoinedCommunity,
};
