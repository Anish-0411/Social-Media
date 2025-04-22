// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { gmail, password } = req.body;

    if (!gmail || !password) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    const existingUser = await User.findOne({ gmail });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ gmail, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        gmail: newUser.gmail,
      }
    });
  } catch (err) {
    console.error('Registration Error:', err.message);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { gmail, password } = req.body;

    if (!gmail || !password) {
      return res.status(400).json({ message: 'Please provide gmail and password' });
    }

    const user = await User.findOne({ gmail });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      user: {
        id: user._id,
        gmail: user.gmail,
      }
    });
  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// @route   GET /api/auth/me
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Get Me Error:', err.message);
    res.status(500).json({ message: 'Server error while fetching user info' });
  }
});

module.exports = router;