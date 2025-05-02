require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Models
const Card = require('./modules/card');
const User = require('./modules/user');
const Toll = require('./modules/Toll');

// Routes
app.get('/api/balance', async (req, res) => {
  try {
    const user = await User.findOne({ username: 'demoUser' });
    res.json({ balance: user?.balance || 0, paidTolls: user?.paidTolls || [] });
  } catch (error) {
    res.status(500).json({ message: 'Balance error' });
  }
});

app.post('/api/validate-card', async (req, res) => {
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

app.post('/api/update-balances', async (req, res) => {
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

// Toll Routes
app.get('/api/tolls', async (req, res) => {
  try {
    res.json(await Toll.find({}));
  } catch (error) {
    res.status(500).json([]);
  }
});

app.post('/api/pay-tolls', async (req, res) => {
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

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
