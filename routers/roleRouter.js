const express = require("express");
const roleRouter = express.Router();

roleRouter.post("/", createRole);
roleRouter.get("/", fetchAllRoles);

module.exports = roleRouter;
