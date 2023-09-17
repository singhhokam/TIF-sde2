const { createUserRole } = require("../services/roleServices");

async function createRole(req, res, next) {
  try {
    const data = await createUserRole(req.body);
    res.status(201).json({
      status: true,
      content: data,
    });
  } catch (error) {
    next(error);
  }
}
