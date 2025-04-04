import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

let users = {}; // Simulating user database in-memory

// Signup Route
app.post("/api/auth/signup", (req, res) => {
  const { email, password } = req.body;
  if (users[email]) {
    return res.status(400).json({ message: "User already exists" });
  }

  users[email] = { email, password, progress: {} };
  res.status(201).json({ message: "User registered successfully" });
});

// Signin Route
app.post("/api/auth/signin", (req, res) => {
  const { email, password } = req.body;
  if (!users[email] || users[email].password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.status(200).json({ message: "Login successful", user: users[email] });
});

// Save Progress Route
app.post("/api/progress/save", (req, res) => {
  const { email, letter, progress } = req.body;
  if (!users[email]) {
    return res.status(404).json({ message: "User not found" });
  }

  users[email].progress[letter] = progress;
  res.status(200).json({ message: "Progress saved successfully" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
