const express = require("express");
const {
  getProfile,
  register,
  login,
} = require("../controllers/authController");
const authRouter = express.Router();

authRouter.get("/me", getProfile);
authRouter.post("/signup", register);
authRouter.post("/signin", login);

module.exports = authRouter;
