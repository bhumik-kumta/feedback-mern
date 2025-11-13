const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

// 🔹 Register Route
router.post(
  '/register',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').isLength({ min: 4 }).withMessage('Password must be at least 4 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { username, password, role } = req.body;

      const existing = await User.findOne({ username });
      if (existing) return res.status(400).json({ message: 'Username already exists' });

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword, role });
      await user.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// 🔹 Login Route
router.post(
  '/login',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });
      if (!user) return res.status(400).json({ message: 'Invalid username or password' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid username or password' });

      const token = jwt.sign(
        { id: user._id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.json({ token, role: user.role, username: user.username });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
