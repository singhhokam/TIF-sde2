const express = require("express");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const associate = require("./models/associateModels");
const roleRouter = require("./routers/roleRouter");
const authRouter = require("./routers/authRouter");
const communityRouter = require("./routers/communityRouter");
const memberRouter = require("./routers/memberRouter");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

try {
  database.authenticate();
  console.log("connected to database ", database.getDatabaseName());
  // associate();
  database.sync();
} catch (error) {
  console.error(error);
}

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/v1/role", roleRouter);
app.use("/v1/auth", authRouter);
app.use("/v1/community", communityRouter);
app.use("/v1/member", memberRouter);
app.use(errorHandler);

app.listen(port, () => console.log(`SaaS app listening on port ${port}!`));
