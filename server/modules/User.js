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
  age: { 
    type: Number 
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
    default: 0 
  },
  tolls: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Toll'
  }],
  paidTolls: [{  
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Toll'
  }],

  violations: [{  
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Violation' 
  }],
  paidViolations: [{  
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Violation' 
  }],
  // In your user schema (add this to the schema)
parkings: [{
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'
  },
  location: String,
  startTime: Date,
  endTime: Date,
  amount: Number,
  country: String
}],
  
  Vehicle: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" }]
});


module.exports = mongoose.model('User', userSchema);