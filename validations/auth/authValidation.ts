import Joi from "joi";

export const registerValidation = Joi.object({
  firstName: Joi.string().trim().min(2).max(30).required(),
  lastName: Joi.string().trim().min(2).max(20).required(),
  userName: Joi.string().trim().min(2).max(20).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(6).required(),
  userType: Joi.string().valid("user", "admin").default("user")
});

export const loginValidation = Joi.object({
    userName: Joi.string().trim().min(2).max(20).required(),
    password: Joi.string().trim().min(6).required()
});