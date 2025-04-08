import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

// SIGNUP: Create new user
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: { _id: newUser._id, email: newUser.email, progress: newUser.progress }
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
});

// SIGNIN: Validate user credentials
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid credentials" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    res.json({
      message: "Signin successful",
      user: { _id: user._id, email: user.email, progress: user.progress }
    });
  } catch (error) {
    res.status(500).json({ message: "Error signing in", error: error.message });
  }
});

// UPDATE PROGRESS: Update user's progress for a given letter
router.post("/progress", async (req, res) => {
  try {
    const { userId, letter, isCorrect } = req.body;
    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "User not found" });

    // Get existing progress for this letter or initialize it
    let letterProgress = user.progress.get(letter) || { attempts: 0, success: 0 };
    letterProgress.attempts += 1;
    if (isCorrect) {
      letterProgress.success += 1;
    }
    user.progress.set(letter, letterProgress);
    await user.save();

    res.json({ message: "Progress updated", progress: letterProgress });
  } catch (error) {
    res.status(500).json({ message: "Error updating progress", error: error.message });
  }
});

// GET PROGRESS: Retrieve progress for a specific user
router.get("/progress/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "User not found" });
    // Convert Map to plain object
    res.json({ progress: Object.fromEntries(user.progress) });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving progress", error: error.message });
  }
});

export default router;
