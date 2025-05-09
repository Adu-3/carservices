require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

const userRoutes = require('./routes/userRoutes');
const cardRoutes = require('./routes/cardRoutes');
const tollRoutes = require('./routes/tollRoutes');
const formRoutes = require('./routes/formRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const parkingRoutes = require('./routes/ParkingRoute');
const insuranceRoutes = require('./routes/insuranceRoutes');
const trafficViolationsRoutes = require('./routes/violationsRoutes');


app.use(userRoutes);
app.use(cardRoutes);
app.use(tollRoutes);
app.use(formRoutes);
app.use(vehicleRoutes);
app.use(paymentRoutes);
app.use("/api",parkingRoutes);
app.use(insuranceRoutes);
app.use("/api", trafficViolationsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
