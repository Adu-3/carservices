const express = require('express');
const router = express.Router();
const Insurance = require('../modules/Insurance');
const Vehicle = require('../modules/Vehicle');
const User = require('../modules/User'); // ← Make sure you import this

router.post('/api/insurances', async (req, res) => {
  try {
    const { insuranceType, coverageLocation, period, vehicleId } = req.body;

    const periodToDays = {
      '3 days': 3,
      '7 days': 7,
      '1 month': 30,
      '3 months': 90,
      '1 year': 365
    };

    const costTable = {
      Basic: 15,
      Premium: 35
    };

    const multiplierTable = {
      '3 days': 1,
      '7 days': 2,
      '1 month': 7,
      '3 months': 18,
      '1 year': 60
    };

    const days = periodToDays[period];
    const multiplier = multiplierTable[period];
    const baseCost = costTable[insuranceType];
    if (!days || !multiplier || !baseCost) {
      return res.status(400).json({ success: false, message: 'Invalid insurance details' });
    }

    const totalCost = baseCost * multiplier;

    // Fetch vehicle and its user
    const vehicle = await Vehicle.findById(vehicleId).populate('user');
    if (!vehicle) return res.status(404).json({ success: false, message: 'Vehicle not found' });

    const user = await User.findById(vehicle.user);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    if (user.balance < totalCost) {
      return res.status(403).json({ success: false, message: 'Insufficient balance' });
    }

    // Deduct balance
    user.balance -= totalCost;
    await user.save();

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + days);

    const insurance = await Insurance.create({
      insuranceType,
      coverageLocation,
      endDate
    });

    vehicle.insurance = insurance._id;
    await vehicle.save();

    res.status(201).json({ success: true, insurance });
  } catch (error) {
    console.error('❌ Error creating insurance:', error.message);
    res.status(500).json({ success: false, message: 'Failed to create insurance', error: error.message });
  }
});

module.exports = router;
