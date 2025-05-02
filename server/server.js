require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Routes
const userRoutes = require('./routes/userRoutes');
const cardRoutes = require('./routes/cardRoutes');
const tollRoutes = require('./routes/tollRoutes');
const formRoutes = require('./routes/formRoutes');

app.use(userRoutes);
app.use(cardRoutes);
app.use(tollRoutes);
app.use(formRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
