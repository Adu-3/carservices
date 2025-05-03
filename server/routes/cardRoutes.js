const express = require('express');
const router = express.Router();
const User = require('../modules/User');
const Card = require('../modules/Card');

// ✅ Get User Balance
router.get('/api/balance/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select('balance');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching balance', error: error.message });
  }
});

// ✅ Validate Card
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
    res.status(500).json({ message: 'Validation failed', error: error.message });
  }
});

// ✅ Update Balances
router.post('/api/update-balances', async (req, res) => {
  try {
    const { cardNumber, amount, username } = req.body;

    const card = await Card.findOneAndUpdate(
      { number: cardNumber.replace(/\s/g, '') },
      { $inc: { balance: -amount } },
      { new: true }
    );

    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    const user = await User.findOneAndUpdate(
      { username },
      { $inc: { balance: amount } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      newBalance: user.balance,
      cardBalance: card.balance
    });
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
});

module.exports = router;
