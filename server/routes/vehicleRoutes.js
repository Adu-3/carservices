const express = require('express');
const router = express.Router();
const Vehicle = require('../modules/Vehicle');
const User = require('../modules/User');

// ✅ Create a new vehicle and link to a user
router.post('/api/vehicles', async (req, res) => {
    try {
      const { username, nickname, ownerName, color, year, make, model, country, plateNumber } = req.body;
  
      const user = await User.findOne({ username });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const newVehicle = new Vehicle({
        nickname,
        ownerName,
        color,
        year,
        make,
        model,
        country,
        plateNumber,
        user: user._id
      });
  
      await newVehicle.save();
  
      // Link the vehicle to the user
      user.vehicle = newVehicle._id;
      await user.save();
  
      res.status(201).json({ message: 'Vehicle registered successfully', vehicle: newVehicle });
    } catch (error) {
      console.error('Error creating vehicle:', error);
      res.status(500).json({ message: 'Vehicle registration failed', error: error.message });
    }
  });
  

// ✅ Get all vehicles for a user
router.get('/api/vehicles/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const vehicles = await Vehicle.find({ user: user._id });
    res.json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ message: 'Failed to fetch vehicles', error: error.message });
  }
});

// ✅ Delete a vehicle by ID
router.delete('/api/vehicles/:vehicleId', async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.vehicleId);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    res.status(500).json({ message: 'Failed to delete vehicle', error: error.message });
  }
});

// ✅ Optional: Update vehicle by ID
router.put('/api/vehicles/:vehicleId', async (req, res) => {
  try {
    const updates = req.body;
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.vehicleId, updates, { new: true });

    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    res.json({ message: 'Vehicle updated', vehicle });
  } catch (error) {
    console.error('Error updating vehicle:', error);
    res.status(500).json({ message: 'Failed to update vehicle', error: error.message });
  }
});

module.exports = router;
