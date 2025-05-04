const express = require('express');
const router = express.Router();
const User = require('../modules/User');
const Vehicle = require('../modules/Vehicle'); // Assuming the Vehicle model exists

// Route to handle parking payment and save parking history
router.post('/api/pay-parking', async (req, res) => {
  const {
    username,
    amount,
    carId,
    location,
    country,
    startTime,
    endTime
  } = req.body;

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

    // Find the full car details by carId
    const car = await Vehicle.findById(carId);  // Assuming Vehicle is the correct model
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Add parking record with full car details to user's parkings array
    user.parkings.push({
      car: car,  // Store the full car object, not just the carId
      location,
      country,
      startTime,
      endTime,
      amount
    });

    // Save the updated user document
    await user.save();

    // Return the updated balance and parking data
    return res.json({ 
      newBalance: user.balance,
      parking: user.parkings[user.parkings.length - 1] // Return the latest parking record
    });
  } catch (error) {
    console.error('Error processing payment:', error);
    return res.status(500).json({ message: 'Payment failed. Please try again.' });
  }
});

// Route to get user's cars
router.get('/api/user/:username/cars', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).populate('Vehicle');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if Vehicle exists and send it back, else send an empty array
    res.json(user.Vehicle || []);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user cars' });
  }
});

// Route to get user's parking history with populated car details
router.get('/api/parking/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .populate('parkings.car');  // Populate the car field in the parkings array

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user's parkings array with populated car data
    res.json(user.parkings || []);
  } catch (error) {
    console.error('Error fetching parking history:', error);
    res.status(500).json({ message: 'Error loading parking data' });
  }
});

module.exports = router;
