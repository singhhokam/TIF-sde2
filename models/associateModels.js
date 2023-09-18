const Community = require("./community");
const Member = require("./member");
const Role = require("./role");
const User = require("./user");

function associate() {
  User.hasMany(Community, { foreignKey: "userId", as: "owner" });
  Community.belongsTo(User, { foreignKey: "userId", as: "owner" });

  Community.hasMany(Member, { foreignKey: "communityId", as: "members" });
  Member.belongsTo(Community);

  User.hasMany(Member, { foreignKey: "userId", as: "user" });
  Member.belongsTo(User);

  Member.belongsTo(Role, { foreignKey: "roleId", as: "role" });
}

module.exports = associate;
