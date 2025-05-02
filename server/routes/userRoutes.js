const express = require('express');
const router = express.Router();
const User = require('../modules/User'); // adjust path based on your structure

// Balance
router.get('/api/balance', async (req, res) => {
  try {
    const user = await User.findOne({ username: 'demoUser' });
    res.json({ balance: user?.balance || 0, paidTolls: user?.paidTolls || [] });
  } catch (error) {
    res.status(500).json({ message: 'Balance error' });
  }
});
module.exports = router;
