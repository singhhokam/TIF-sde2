const Community = require("./community");
const Member = require("./member");
const Role = require("./role");
const User = require("./user");

function associate() {
  User.hasMany(Community, {
    foreignKey: "userId",
    as: "owner",
    onDelete: "CASCADE",
  });
  Community.belongsTo(User, { foreignKey: "userId", as: "owner" });

  Community.hasMany(Member, {
    foreignKey: "communityId",
    as: "members",
    onDelete: "CASCADE",
  });
  Member.belongsTo(Community);

  User.hasMany(Member, {
    foreignKey: "userId",
    as: "user",
    onDelete: "CASCADE",
  });
  Member.belongsTo(User);

  Role.hasMany(Member, { foreignKey: "roleId", as: "role" });
  Member.belongsTo(Role, { foreignKey: "roleId", as: "role" });
}

module.exports = associate;
