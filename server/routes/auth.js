const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ Email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password." });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Send the token in a HTTP-only cookie
    res.cookie("token", token, {
      secure: process.env.NODE_ENV === 'production', // Only set to true if using HTTPS
      maxAge: 3600000 // 1 hour
    });

    res.json({ username: user.Username, token }); // Send token along with username
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User Signup
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ Email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      Username: username,
      Email: email,
      Password: hashedPassword,
    };

    const newUser = await User.create(user);

    // Generate JWT
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Send the token in a HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // use secure flag in production
      maxAge: 3600000 // 1 hour
    });

    res.status(201).json({ username: newUser.Username, token }); // Send token along with username
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Validate Token
router.get("/validate", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ Status: false });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.json({ Status: false });
    res.json({ Status: true });
  });
});

module.exports = router;
