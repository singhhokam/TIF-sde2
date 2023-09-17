const express = require("express");
const communityRouter = express.Router();

communityRouter.get("/", fetchAllCommunities);
communityRouter.post("/", newCommunity);
communityRouter.get("/:id/members", fetchCommunityMembers);
communityRouter.get("/me/owner", fetchMyCommunity);
communityRouter.get("/me/member", fetchJoinedCommunity);

module.exports = communityRouter;
