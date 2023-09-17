const { createUser, loginUser, getUser } = require("../services/authServices");

async function register(req, res, next) {
  try {
    const data = await createUser(req.body);
    res
      .status(201)
      .cookie("access_token", data.meta.access_token, {
        maxAge: 86400000,
        httpOnly: true,
      })
      .json({ status: true, content: data });
  } catch (error) {
    next({ status: 400, errors: [error] });
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const data = await loginUser(email, password);
    res
      .status(200)
      .cookie("access_token", data.meta.access_token, {
        maxAge: 86400000,
        httpOnly: true,
      })
      .json({ status: true, content: data });
  } catch (error) {
    next({ status: 400, errors: [error] });
  }
}

async function getProfile(req, res, next) {
  try {
    const data = await getUser(req.cookies.access_token);
    res.status(200).json({ status: true, content: data });
  } catch (error) {
    next({ status: 401, errors: [error] });
  }
}

module.exports = {
  register,
  login,
  getProfile,
};
