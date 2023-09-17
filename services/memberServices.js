const Community = require("../models/community");
const Member = require("../models/member");
const Role = require("../models/role");
const User = require("../models/user");

async function addMemberToCommunity(communityId, userId, memberId, roleId) {
  const community = await Community.findByPk(communityId, {
    include: [
      {
        model: User,
        as: "owner",
      },
    ],
  });
  if (!community) {
    throw {
      param: "community",
      message: "Community not found.",
      code: "RESOURCE_NOT_FOUND",
    };
  }
  if (community.owner.id !== userId) {
    throw {
      message: "You are not authorized to perform this action.",
      code: "NOT_ALLOWED_ACCESS",
    };
  }
  const user = await User.findByPk(memberId);
  if (!user) {
    throw {
      param: "user",
      message: "User not found.",
      code: "RESOURCE_NOT_FOUND",
    };
  }
  const alreadyMember = await Member.findOne({
    where: { userId: memberId, communityId: communityId },
  });
  if (alreadyMember) {
    throw {
      message: "User is already added in the community.",
      code: "RESOURCE_EXISTS",
    };
  }
  const role = await Role.findOne({ where: { id: roleId } });
  if (!role) {
    throw {
      param: "role",
      message: "Role not found.",
      code: "RESOURCE_NOT_FOUND",
    };
  }
  const member = await Member.create({
    communityId: communityId,
    userId: memberId,
    roleId: roleId,
  });
  return { data: member };
}

async function removeMemberFromCommunity(userId, memberId) {
  let community = await Community.findOne({
    where: {
      userId: userId,
    },
  });
  if (!community) {
    const moderator = await Member.findOne({
      where: { id: userId },
      include: [
        {
          model: Role,
          where: {
            name: {
              [Op.or]: ["Community Admin", "Community Moderator"],
            },
          },
          required: false,
        },
        {
          model: Community,
          attributes: ["id"],
        },
      ],
    });
    community = moderator.community;
  }
  const member = await Member.findOne({
    where: { id: memberId, communityId: community.id },
  });
  if (!member) {
    throw {
      message: "Member not found.",
      code: "RESOURCE_NOT_FOUND",
    };
  }
  await member.destroy();
}

module.exports = {
  addMemberToCommunity,
  removeMemberFromCommunity,
};
