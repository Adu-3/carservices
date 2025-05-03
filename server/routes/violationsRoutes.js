const express = require('express');
const mongoose = require('mongoose');
const Violation = require('./models/Violation');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/trafficDB', { useNewUrlParser: true });

app.get('/api/violations/:plateNumber', async (req, res) => {
  try {
    const violations = await Violation.find({ 
      plateNumber: req.params.plateNumber,
      paid: false  
    });
    res.json(violations);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch violations' });
  }
});

app.post('/api/violations/pay', async (req, res) => {
  const { violationIds } = req.body;  

  try {
    await Violation.updateMany(
      { _id: { $in: violationIds } },
      { $set: { paid: true } }
    );
    res.json({ success: true, message: 'Payment processed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Payment failed' });
  }
});

app.post('/api/violations/add', async (req, res) => {
  const newViolation = new Violation(req.body);
  await newViolation.save();
  res.json(newViolation);
});

app.listen(5000, () => console.log('Server running on port 5000'));