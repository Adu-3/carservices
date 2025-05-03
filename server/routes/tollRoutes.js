const express = require('express');
const router = express.Router();
const Toll = require('../modules/Toll'); 
const User = require('../modules/User'); 

router.get('/api/:username/tolls', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .populate({ path: 'tolls', model: 'Toll' });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.tolls || user.tolls.length === 0) {
      return res.status(200).json([]); // Return empty if no tolls
    }

    res.status(200).json(user.tolls);
  } catch (err) {
    console.error('Error fetching tolls:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/api/pay-tolls', async (req, res) => {
  try {
    const { username, tollIds } = req.body;

    if (!username || !Array.isArray(tollIds) || tollIds.length === 0) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const tolls = await Toll.find({ _id: { $in: tollIds } });

    const totalCost = tolls.reduce((sum, toll) => sum + toll.price, 0);
    if (user.balance < totalCost) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Deduct balance
    user.balance -= totalCost;

    // Mark tolls as paid
    user.paidTolls = [...new Set([...(user.paidTolls || []), ...tollIds])];

    await user.save();

    res.status(200).json({
      message: 'Payment successful',
      newBalance: user.balance,
      paidTolls: user.paidTolls
    });
  } catch (err) {
    console.error('Payment error:', err);
    res.status(500).json({ message: 'Payment processing failed' });
  }
});


module.exports = router;
