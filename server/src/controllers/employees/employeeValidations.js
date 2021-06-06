const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const employeeValidationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().min(6).max(255).email().required(),
    age: Joi.number().required(),
    phoneNumber: Joi.number().required(),
    address: Joi.string().required(),
  });
  return employeeValidationSchema.validate(data);
};

const updateValidation = (data) => {
  const employeeValidationSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().min(6).max(255).email(),
    age: Joi.number(),
    phoneNumber: Joi.number(),
    address: Joi.string(),
    id: Joi.string().required(),
  });
  return employeeValidationSchema.validate(data);
};
const stringValidation = (string) => {
  const idValidationSchema = Joi.string().required();
  return idValidationSchema.validate(string);
};

module.exports = { registerValidation, updateValidation, stringValidation };
