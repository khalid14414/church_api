import Joi from "joi";

export const registerSchema = Joi.object({
    name: Joi.string().required().trim(),
    email: Joi.string().email().required().trim(),
    password: Joi.string().min(6).max(20).required().trim(),

});

export const loginSchema = Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().min(6).max(20).required().trim(),
});