const express = require('express');
const router = express.Router();
const Toll = require('../modules/Toll'); 
const User = require('../modules/User'); 


router.get('/api/tolls', async (req, res) => {
    try {
      res.json(await Toll.find({}));
    } catch (error) {
      res.status(500).json([]);
    }
  });
  
  router.post('/api/pay-tolls', async (req, res) => {
    try {
      const tolls = await Toll.find({ _id: { $in: req.body.tollIds } });
      const total = tolls.reduce((sum, toll) => sum + toll.price, 0);
      const user = await User.findOneAndUpdate(
        { username: 'demoUser', balance: { $gte: total } },
        { $inc: { balance: -total }, $addToSet: { paidTolls: { $each: req.body.tollIds } } },
        { new: true }
      );
      if (!user) {
        const current = await User.findOne({ username: 'demoUser' });
        return res.status(400).json({ 
          message: `Need ${total - (current?.balance || 0)} more SAR` 
        });
      }
      res.json({ newBalance: user.balance, paidTolls: user.paidTolls });
    } catch (error) {
      res.status(500).json({ message: 'Payment failed' });
    }
  });
module.exports = router;
