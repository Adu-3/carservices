const express = require('express');
const router = express.Router();
const Parking = require('../modules/Parking'); // Correctly import the Parking model

// GET /api/parking-locations - Fetch parking locations by country
router.get('/parking-locations', async (req, res) => {
  const { country } = req.query; // Get country from query parameters
  if (!country) {
    return res.status(400).json({ message: 'Country is required' });
  }

  try {
    // Fetch parking data from the "parkings" collection
    const parkingData = await Parking.find({ country });
    if (!parkingData.length) {
      return res.status(404).json({ message: `No parking locations found for country: ${country}` });
    }

    res.json({ parkingLocations: parkingData[0].parkingLocations || [] });
  } catch (error) {
    console.error('Error fetching parking data:', error);
    res.status(500).json({ message: 'Failed to fetch parking data' });
  }
});

module.exports = router;
