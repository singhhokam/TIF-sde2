const { verify } = require("jsonwebtoken");
require("dotenv").config();

function authMiddleware(req, res, next) {
  const token = req.cookies.access_token;
  const isValid =
    token &&
    verify(token, process.env.SECRET, {
      algorithms: ["HS256"],
    });
  if (isValid) {
    next();
  } else {
    res.status(401).json({
      status: false,
      errors: [
        { message: "You need to sign in to proceed.", code: "NOT_SIGNEDIN" },
      ],
    });
  }
}

module.exports = {
  authMiddleware,
};
