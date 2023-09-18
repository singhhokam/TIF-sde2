const { verify } = require("jsonwebtoken");
const {
  createCommunity,
  getAllCommunities,
  getAllMembersByCommunity,
  getMyJoinedCommunity,
  getMyOwnedCommunity,
} = require("../services/communityServices");
require("dotenv").config();

async function newCommunity(req, res, next) {
  try {
    const { id } = verify(req.cookies.access_token, process.env.SECRET, {
      algorithms: ["HS256"],
    });
    const data = await createCommunity(req.body.name, id);
    res.status(201).json({ status: true, content: data });
  } catch (error) {
    console.log(error);
    next({ status: 400, errors: [error] });
  }
}

async function fetchAllCommunities(req, res, next) {
  try {
    const data = await getAllCommunities();
    res.status(200).json({ status: true, content: data });
  } catch (error) {
    next({ status: 400, errors: [error] });
  }
}

async function fetchCommunityMembers(req, res, next) {
  try {
    const data = await getAllMembersByCommunity(req.params.id);
    res.status(200).json({ status: true, content: data });
  } catch (error) {
    next({ status: 400, errors: [error] });
  }
}

async function MyJoinedCommunities(req, res, next) {
  try {
    const { id } = verify(req.cookies.access_token, process.env.SECRET, {
      algorithms: ["HS256"],
    });
    const data = await getMyJoinedCommunity(id);
    res.status(200).json({ status: true, content: data });
  } catch (error) {
    next({ status: 400, errors: [error] });
  }
}

async function MyOwnedCommunities(req, res, next) {
  try {
    const { id } = verify(req.cookies.access_token, process.env.SECRET, {
      algorithms: ["HS256"],
    });
    const data = await getMyOwnedCommunity(id);
    res.status(200).json({ status: true, content: data });
  } catch (error) {
    next({ status: 400, errors: [error] });
  }
}

module.exports = {
  newCommunity,
  fetchAllCommunities,
  fetchCommunityMembers,
  MyJoinedCommunities,
  MyOwnedCommunities,
};
