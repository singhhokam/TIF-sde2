const { Snowflake } = require("@theinternetfolks/snowflake");
const Role = require("../models/role");
const { validateSchema, roleSchema } = require("../validations/validator");

async function createUserRole(data) {
  const { name } = data;
  const valid = validateSchema(roleSchema, { name: name });
  if (valid) {
    const id = Snowflake.generate({ timestamp: Date.now() });
    const role = await Role.create({
      id: id,
      name: name,
      scopes: data.scopes || "user",
    }); // MySQL does not support array data type so I have used a string here instead
    return { data: role };
  }
}

async function getAllRoles(page = 1, perPage = 10) {
  const roles = await Role.findAll({
    limit: perPage,
    offset: (page - 1) * perPage,
  });
  const roleCount = await Role.count();
  const pages = roleCount / 10;
  return { meta: { total: roleCount, pages: pages, page: pages }, data: roles };
}

module.exports = {
  createUserRole,
  getAllRoles,
};
