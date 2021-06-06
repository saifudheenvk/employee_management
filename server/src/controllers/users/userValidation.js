const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const userValidationSchema = Joi.object({
    password: Joi.string().max(1024).min(6).required(),
    name: Joi.string().required(),
    email: Joi.string().min(6).max(255).email().required(),
  });
  return userValidationSchema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).email().required(),
    password: Joi.string().max(1024).min(6).required(),
  });
  return schema.validate(data);
};

module.exports = { registerValidation, loginValidation };
