// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../modules/User'); 

// Route to handle parking payment
router.post('/api/pay-parking', async (req, res) => {
  const { username, amount } = req.body;  // Receive username and payment amount

  try {
    // Find user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user has sufficient balance
    if (user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Deduct the amount from user's balance
    user.balance -= amount;

    // Save the updated user balance
    await user.save();

    // Return the updated balance
    return res.json({ newBalance: user.balance });
  } catch (error) {
    console.error('Error processing payment:', error);
    return res.status(500).json({ message: 'Payment failed. Please try again.' });
  }
});

module.exports = router;
