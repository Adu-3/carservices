const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../modules/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'fallbacksecret';  // fallback if .env isn't loaded

// Register
router.post('/api/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      accountType: username === 'admin' ? 'admin' : 'user',
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

// Login
router.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id, username: user.username, accountType: user.accountType }, JWT_SECRET, { expiresIn: '1d' });

    res.json({
      token,
      username: user.username,
      accountType: user.accountType
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

// Protected route: Get user profile
router.get('/api/user/:username', async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

router.post('/api/user/update-age', async (req, res) => {
  try {
    const { username, age } = req.body;
    const user = await User.findOneAndUpdate({ username }, { age }, { new: true });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'Age updated', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update age' });
  }
});

// Get all users (for admin or internal use)
router.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password field
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
});

// Update user by ID
router.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true, // return the updated document
      runValidators: true // run schema validators
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Server error while updating user' });
  }
});



module.exports = router;
