const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../modules/User'); // Adjust the path as needed

const router = express.Router();

// REGISTER
router.post('/api/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      accountType: "user",
      balance: 0 // Initialize balance to 0
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

// LOGIN
router.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Input validation
    if (!username || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Username and password are required' 
      });
    }

    // Find user in database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid username or password' 
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid username or password' 
      });
    }

    // Return basic user info without token
    res.json({ 
      success: true,
      message: 'Login successful',
      user: {
        username: user.username,
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Login failed',
      error: error.message 
    });
  }
});

module.exports = router;