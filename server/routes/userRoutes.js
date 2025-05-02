const express = require('express');
const User = require('../modules/User'); // adjust path based on your structure
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Balance
router.get('/api/balance/:username', async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username }).populate('paidTolls');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      balance: user.balance || 0,
      paidTolls: user.paidTolls || []
    });
  } catch (error) {
    res.status(500).json({ message: 'Balance error', error: error.message });
  }
});

// Login & Register 
router.post('/api/user/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

// Login user
const JWT_SECRET = crypto.randomBytes(64).toString('hex');

router.post('/api/user/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: 'Invalid username or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid username or password' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ message: 'Login successful', token });

  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});
module.exports = router;