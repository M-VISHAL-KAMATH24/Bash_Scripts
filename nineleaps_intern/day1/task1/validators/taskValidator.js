const Joi = require('joi');

const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    'string.min': 'Title must be at least 3 characters',
    'string.max': 'Title cannot exceed 100 characters'
  }),
  description: Joi.string().max(500).optional(),
  completed: Joi.boolean().default(false)
});

const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  description: Joi.string().max(500).optional(),
  completed: Joi.boolean().optional()
});

module.exports = { createTaskSchema, updateTaskSchema };
