const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../modules/User'); // Adjust the path as needed

const router = express.Router();

// Use a consistent secret (set JWT_SECRET in your .env file)
const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret';

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid or expired' });
  }
};

// REGISTER
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

// LOGIN
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

// BALANCE (optional auth protected)
router.get('/api/balance/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).populate('paidTolls');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      balance: user.balance || 0,
      paidTolls: user.paidTolls || []
    });
  } catch (error) {
    res.status(500).json({ message: 'Balance error', error: error.message });
  }
});

// Example Protected Route
router.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'You are authenticated', userId: req.userId });
});

module.exports = router;
