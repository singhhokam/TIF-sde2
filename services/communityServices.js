const Community = require("../models/community");
const Member = require("../models/member");
const Role = require("../models/role");
const User = require("../models/user");
const { validateCommunityName } = require("../validations/validator");

async function createCommunity(name, userId) {
  const valid = validateCommunityName(name);
  if (valid) {
    const communityObj = {
      name: name,
      slug: name.split(" ").join("-"),
      userId: userId,
    };
    const community = await Community.create(communityObj);
    const role = await Role.create({
      name: "Community Admin",
      scopes: "admin",
    });
    const member = await Member.create({
      communityId: community.isSoftDeleted,
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
        model: User,
        attributes: ["id", "name"],
        as: "owner",
      },
    ],
  });
  return {
    data: communities,
    meta: {
      total: communities.length,
      pages: communities.length / 10,
      page: communities.length / 10,
    },
  };
}

async function getAllMembersByCommunity(id) {
  const members = await Member.findAll({
    where: { communityId: id },
    include: [
      {
        model: User,
        attributes: ["id", "name"],
      },
      {
        model: Role,
        attributes: ["id", "name"],
      },
    ],
  });
  return {
    data: members,
    meta: {
      total: members.length,
      pages: members.length / 10,
      page: members.length / 10,
    },
  };
}

async function getMyOwnedCommunity(userId) {
  const communities = await Community.findAll({ where: { userId: userId } });
  return {
    data: communities,
    meta: {
      total: communities.length,
      pages: communities.length / 10,
      page: communities.length / 10,
    },
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
      },
      {
        model: User,
        as: "owner",
        attributes: ["id", "name"],
      },
    ],
  });
  return {
    data: communities,
    meta: {
      total: communities.length,
      pages: communities.length / 10,
      page: communities.length / 10,
    },
  };
}

module.exports = {
  getAllCommunities,
  createCommunity,
  getAllMembersByCommunity,
  getMyOwnedCommunity,
  getMyJoinedCommunity,
};
