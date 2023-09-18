const { DataTypes } = require("sequelize");
const database = require("../config/database");

const Role = database.define(
  "roles",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(64),
      unique: true,
      allowNull: false,
    },
    scopes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Role;
