const express = require("express");
const memberRouter = express.Router();

memberRouter.post("/", addMember);
memberRouter.delete("/member/:id", removeMember);

module.exports = memberRouter;
