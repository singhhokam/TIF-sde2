const { DataTypes } = require("sequelize");
const database = require("../config/database");
const Community = require("./community");
const User = require("./user");
const Role = require("./role");

const Member = database.define(
  "members",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    createdAt: "created_at",
    updatedAt: false,
  }
);

module.exports = Member;
