import Joi from "joi";

const emailSchema = Joi.string().email().required().messages({
  "any.required": "Email is required",
  "string.email": "Email must be a valid format",
});

const passwordSchema = Joi.string().required().messages({
  "any.required": "Password is required",
});

export const createUserBodySchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
  }),
  email: emailSchema,
  roleId: Joi.number().optional(),
  password: passwordSchema
    .min(8)
    .messages({
      "string.min": "Password must be at least 8 characters",
      "password.uppercase": "Password must have at least one uppercase letter",
      "password.lowercase": "Password must have at least one lowercase letter",
      "password.special": "Password must have at least one special character",
    })
    .custom((value, helpers) => {
      if (!/[A-Z]/.test(value)) {
        return helpers.error("password.uppercase");
      }
      if (!/[a-z]/.test(value)) {
        return helpers.error("password.lowercase");
      }
      if (!/[!@#$%]/.test(value)) {
        return helpers.error("password.special");
      }
      return value;
    }),
}).options({
  stripUnknown: true,
});

export const loginBodySchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
}).options({
  stripUnknown: true,
});

export const updateBodySchema = createUserBodySchema;
