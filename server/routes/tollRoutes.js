const express = require('express');
const router = express.Router();
const Toll = require('../modules/Toll'); 
const User = require('../modules/User'); 

router.get('/api/:username/tolls', async (req, res) => {
  try {
    const username = req.params.username;
    
    const user = await User.findOne({ username })
      .populate({
        path: 'tolls',
        model: 'Toll' // Explicitly referencing the Toll model
      })
      .select('tolls');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.tolls);
  } catch (error) {
    console.error('Error fetching user tolls:', error);
    res.status(500).json({ message: 'Server error while fetching tolls' });
  }
});

module.exports = router;
