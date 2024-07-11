import Joi from "joi";

export const createTodoSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Title is required",
  }),
  description: Joi.string().required().messages({
    "any.required": "Description is required"
  }),
});

export const updateTodoSchema = createTodoSchema;
