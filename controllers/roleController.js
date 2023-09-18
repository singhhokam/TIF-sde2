const { createUserRole, getAllRoles } = require("../services/roleServices");

async function createRole(req, res, next) {
  try {
    const data = await createUserRole(req.body);
    res.status(201).json({
      status: true,
      content: data,
    });
  } catch (error) {
    next({ status: 400, errors: [error] });
  }
}

async function fetchAllRoles(req, res, next) {
  try {
    const data = await getAllRoles();
    res.status(200).json({
      status: true,
      content: data,
    });
  } catch (error) {
    next({ status: 400, errors: error });
  }
}

module.exports = {
  createRole,
  fetchAllRoles,
};
