const { verify } = require("jsonwebtoken");
const {
  addMemberToCommunity,
  removeMemberFromCommunity,
} = require("../services/memberServices");
require("dotenv").config();

async function newCommunityMember(req, res, next) {
  try {
    const { id } = verify(req.cookies.access_token, process.env.SECRET, {
      algorithms: ["HS256"],
    });
    const { community, user, role } = req.body;
    const data = await addMemberToCommunity(community, id, user, role);
    res.status(200).json({ status: true, content: data });
  } catch (error) {
    next({ status: 400, errors: [error] });
  }
}

async function deleteMember(req, res, next) {
  try {
    const { id } = verify(req.cookies.access_token, process.env.SECRET, {
      algorithms: ["HS256"],
    });
    const data = await removeMemberFromCommunity(id, req.params.id);
    res.status(200).json({ status: true, content: data });
  } catch (error) {
    next({ status: 400, errors: [error] });
  }
}

module.exports = {
  newCommunityMember,
  deleteMember,
};
