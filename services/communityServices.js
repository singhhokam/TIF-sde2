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
    const role = await Role.create({
      id: Snowflake.generate({ timestamp: Date.now() }),
      name: "Community Admin",
      scopes: "admin",
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
