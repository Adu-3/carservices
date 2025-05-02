const express = require('express');
const router = express.Router();
const Toll = require('../modules/Toll'); 
const User = require('../modules/User'); 

router.get('/api/tolls/:username', async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username }).populate('paidTolls');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.paidTolls || []);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tolls', error: error.message });
  }
});

router.post('/api/pay-tolls', async (req, res) => {
  try {
    const { tollIds, username } = req.body;

    // Fetch tolls to calculate total price
    const tolls = await Toll.find({ _id: { $in: tollIds } });
    const total = tolls.reduce((sum, toll) => sum + toll.price, 0);

    // Try to deduct balance and add tolls to paidTolls
    const user = await User.findOneAndUpdate(
      { username, balance: { $gte: total } },
      {
        $inc: { balance: -total },
        $addToSet: { paidTolls: { $each: tollIds } }
      },
      { new: true }
    );

    // If not enough balance
    if (!user) {
      const current = await User.findOne({ username });
      return res.status(400).json({
        message: `Need ${total - (current?.balance || 0)} more SAR`
      });
    }

    res.json({ newBalance: user.balance, paidTolls: user.paidTolls });
  } catch (error) {
    res.status(500).json({ message: 'Payment failed', error: error.message });
  }
});

module.exports = router;
