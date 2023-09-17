const express = require("express");
const { createRole, fetchAllRoles } = require("../controllers/roleController");
const roleRouter = express.Router();

roleRouter.post("/", createRole);
roleRouter.get("/", fetchAllRoles);

module.exports = roleRouter;
