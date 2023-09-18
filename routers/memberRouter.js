const express = require("express");
const {
  newCommunityMember,
  deleteMember,
} = require("../controllers/memberController");
const memberRouter = express.Router();

memberRouter.post("/", newCommunityMember);
memberRouter.delete("/:id", deleteMember);

module.exports = memberRouter;
