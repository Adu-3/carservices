const express = require('express');
const router = express.Router();
const User = require('../modules/User'); // adjust path based on your structure
const Card = require('../modules/Card')

router.post('/api/update-balances', async (req, res) => {
    try {
      const { cardNumber, amount } = req.body;
      const card = await Card.findOneAndUpdate(
        { number: cardNumber.replace(/\s/g, '') }, 
        { $inc: { balance: -amount } }, 
        { new: true }
      );
      const user = await User.findOneAndUpdate(
        { username: 'demoUser' }, 
        { $inc: { balance: amount } }, 
        { new: true }
      );
      res.json({ newBalance: user.balance, cardBalance: card.balance });
    } catch (error) {
      res.status(500).json({ message: 'Update failed' });
    }
  });
  
  router.post('/api/validate-card', async (req, res) => {
    try {
      const { cardNumber, cardName, expiry, cvv, amount } = req.body;
      const card = await Card.findOne({ 
        number: cardNumber.replace(/\s/g, ''), 
        name: cardName, 
        expiry, 
        cvv 
      });
      if (!card) return res.status(400).json({ message: 'Invalid card' });
      if (card.balance < amount) return res.status(400).json({ message: 'Insufficient funds' });
      res.json({ valid: true });
    } catch (error) {
      res.status(500).json({ message: 'Validation failed' });
    }
  });
module.exports = router;