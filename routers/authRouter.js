const express = require("express");
const authRouter = express.Router();

authRouter.get("/me", userProfile);
authRouter.post("/signup", register);
authRouter.post("/signin", login);

module.exports = authRouter;
