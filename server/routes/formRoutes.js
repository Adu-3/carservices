const express = require('express');
const router = express.Router();
const Form = require('../modules/Form'); // Adjust the path if needed

// Fetch forms from the database
router.get('/api/forms', async (req, res) => {
  try {
    const forms = await Form.find(); // Fetch all forms from MongoDB

    // If no forms found, return a 404
    if (!forms || forms.length === 0) {
      return res.status(404).json({ message: 'No forms found' });
    }

    // Send the fetched forms as JSON
    res.json(forms);

  } catch (error) {
    res.status(500).json({ message: 'Error fetching forms', error: error.message });
  }
});

module.exports = router;
