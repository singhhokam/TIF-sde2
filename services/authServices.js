const { Snowflake } = require("@theinternetfolks/snowflake");
const User = require("../models/user");
require("dotenv").config();
const {
  validateSchema,
  userSchema,
  validateEmail,
} = require("../validations/validator");
const { createHash } = require("crypto");
const { sign, verify } = require("jsonwebtoken");

async function createUser(data) {
  const valid = validateSchema(userSchema, data);
  if (valid) {
    const id = Snowflake.generate({ timestamp: Date.now() });
    data.password = createHash("sha256").update(data.password).digest("hex");
    const user = await User.create({ id: id, ...data });
    const token = sign({ id: user.id, email: user.email }, process.env.SECRET, {
      algorithm: "HS256",
      expiresIn: "1d",
    });
    return {
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
      },
      meta: { access_token: token },
    };
  }
}

async function loginUser(email, password) {
  const valid = validateEmail(email);
  if (valid) {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      throw {
        param: "email",
        message: "The credentials you provided are invalid.",
        code: "INVALID_CREDENTIALS",
      };
    }
    const hashPassword = createHash("sha256").update(password).digest("hex");
    if (!user.password == hashPassword) {
      throw {
        param: "password",
        message: "The credentials you provided are invalid.",
        code: "INVALID_CREDENTIALS",
      };
    }
    const token = sign({ id: user.id, email: user.email }, process.env.SECRET, {
      algorithm: "HS256",
      expiresIn: "1d",
    });
    return {
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
      },
      meta: {
        access_token: token,
      },
    };
  }
}

async function getUser(token) {
  const validToken = verify(token, process.env.SECRET, {
    algorithms: ["HS256"],
  });
  if (!validToken) {
    throw { message: "You need to sign in to proceed.", code: "NOT_SIGNEDIN" };
  }
  const user = await User.findByPk(validToken.id, {
    attributes: { exclude: "password" },
  });
  return { data: user };
}

module.exports = {
  createUser,
  loginUser,
};
