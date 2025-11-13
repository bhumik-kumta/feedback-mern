// backend/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret'; // set strong secret in prod
const JWT_EXPIRES = '7d';

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, password, role } = req.body;
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ message: 'Username already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    user = new User({ username, password: hashed, role: role || 'user' });
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role, username: user.username }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    res.status(201).json({ token, user: { id: user._id, username: user.username, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role, username: user.username }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
