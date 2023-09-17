const express = require("express");
const {
  fetchAllCommunities,
  newCommunity,
  fetchCommunityMembers,
  MyOwnedCommunities,
  MyJoinedCommunities,
} = require("../controllers/communityController");
const communityRouter = express.Router();

communityRouter.get("/", fetchAllCommunities);
communityRouter.post("/", newCommunity);
communityRouter.get("/:id/members", fetchCommunityMembers);
communityRouter.get("/me/owner", MyOwnedCommunities);
communityRouter.get("/me/member", MyJoinedCommunities);

module.exports = communityRouter;
