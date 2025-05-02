const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  email:{
    type: String,
    required: true
  },
  accountType: { 
    type: String, 
    required: true, 
  },
  password: { 
    type: String, required: true 
  },
  balance: { 
    type: Number, 
    default: 100 
  },
  paidTolls: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Toll'
  }],
  Vehicle: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" }]
});

module.exports = mongoose.model('User', userSchema);