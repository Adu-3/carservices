const express = require('express');
const router = express.Router();
const Toll = require('../modules/Toll'); 
const User = require('../modules/User'); 

router.get('/api/:username/tolls', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .populate({ path: 'tolls', model: 'Toll' });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.tolls || user.tolls.length === 0) {
      return res.status(200).json([]); // Return empty if no tolls
    }

    res.status(200).json(user.tolls);
  } catch (err) {
    console.error('Error fetching tolls:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
