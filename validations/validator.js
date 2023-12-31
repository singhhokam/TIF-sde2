const Joi = require("joi");

const roleSchema = Joi.object({
  name: Joi.string().required().min(2).messages({
    "string.base": "name must be a string",
    "any.required": "name can not be empty",
    "string.min": "name must be at least 2 characters long",
  }),
});

const userSchema = Joi.object({
  name: Joi.string().required().min(2).messages({
    "string.base": "name must be a string",
    "any.required": "name cannot be empty",
    "string.min": "name must be at least 2 characters long",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } }) // Add options to customize email validation
    .required()
    .messages({
      "string.email": "Invalid email format", // Custom error message for invalid email
      "any.required": "Email is required",
    }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),
});

function validateSchema(schema, model) {
  const { error, value } = schema.validate(model);
  if (error) {
    throw {
      code: "INVALID_INPUT",
      param: error.details[0].context.key,
      message: error.details[0].message,
    };
  } else {
    return value;
  }
}

function validateEmail(email) {
  const emailSchema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.base": "email must be a string",
      "any.required": "email can not be empty",
      "string.email": "must be a valid email",
    }),
  });
  const { error, value } = emailSchema.validate({ email });
  if (error) {
    throw {
      code: "INVALID_INPUT",
      param: error.details[0].context.key || error.details[0].context.label,
      message: error.details[0].message,
    };
  } else {
    return value;
  }
}

function validateCommunityName(name) {
  const nameSchema = Joi.object({
    name: Joi.string().required().min(2).messages({
      "string.min": "Name should be at least 2 characters.",
      "any.required": "Name can not be empty.",
    }),
  });
  const { error, value } = nameSchema.validate({ name });
  if (error) {
    throw {
      code: "INVALID_INPUT",
      param: error.details[0].context?.key || error.details[0].context?.label,
      message: error.details[0].message,
    };
  } else {
    return value;
  }
}

module.exports = {
  roleSchema,
  validateSchema,
  userSchema,
  validateEmail,
  validateCommunityName,
};
