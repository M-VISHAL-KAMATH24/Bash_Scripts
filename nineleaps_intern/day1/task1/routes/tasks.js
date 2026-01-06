const express = require('express');
const jwt = require('jsonwebtoken');
const Joi = require('joi');  // ADD THIS: Missing import for register validation
const User = require('../models/User');
const Task = require('../models/Task');
const { createTaskSchema, updateTaskSchema } = require('../validators/taskValidator');
const auth = require('../middleware/auth');

const router = express.Router();

// Auth validation schema (reusable)
const authSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'any.required': 'Password is required'
  })
});

// Auth routes
router.post('/auth/register', async (req, res) => {
  try {
    const { error } = authSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ error: 'User already exists' });

    user = new User(req.body);
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    console.error('Register error:', error);  // Log for debugging
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/auth/login', async (req, res) => {
  try {
    const { error } = authSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Task routes (protected)
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id })
      .populate('user', 'email')  // Optional: Fetch user details
      .sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { error } = createTaskSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const task = new Task({ ...req.body, user: req.user._id });
    await task.save();
    const populatedTask = await Task.findById(task._id).populate('user', 'email');
    res.status(201).json(populatedTask);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {  // Basic ObjectId validation
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    const { error } = updateTaskSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { $set: req.body },  // Use $set for safety
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
