import Joi from "joi";

export const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().min(6).max(20).required()
});