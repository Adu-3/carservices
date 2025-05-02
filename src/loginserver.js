const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // Add bcryptjs for hashing comparison
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const DB_URI = "mongodb://localhost:27017/userDB";  // Replace with your MongoDB URI

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  username: String,
  password: String,  // The password stored will be hashed
});

const User = mongoose.model("User", userSchema);

// Endpoint to authenticate user
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Log the username and password received in the request body
  console.log("Username:", username);
  console.log("Password:", password);

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "User not found" });

  // Compare the entered password with the hashed password in the database
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id }, "secretKey", { expiresIn: "1h" });
  res.json({ token });
});

// Starting the server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
