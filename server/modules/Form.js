const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userName: { type: String, required: true },
  info: { type: String, required: true },
});

module.exports = mongoose.model('Form', formSchema);