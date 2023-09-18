const express = require("express");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const associate = require("./models/associateModels");
const roleRouter = require("./routers/roleRouter");
const authRouter = require("./routers/authRouter");
const communityRouter = require("./routers/communityRouter");
const memberRouter = require("./routers/memberRouter");
const errorHandler = require("./middlewares/errorHandler");
const { authMiddleware } = require("./middlewares/authMiddleware");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.disable("X-Powered-By");

try {
  database.authenticate();
  console.log("connected to database ", database.getDatabaseName());
  associate();
  database.sync();
} catch (error) {
  console.error(error);
}

app.use("/v1/role", authMiddleware, roleRouter);
app.use("/v1/auth", authRouter);
app.use("/v1/community", authMiddleware, communityRouter);
app.use("/v1/member", authMiddleware, memberRouter);
app.use(errorHandler);

app.listen(port, () =>
  console.log(
    `SaaS app listening on port ${port}!\n http://localhost:${
      process.env.PORT || port
    }`
  )
);
