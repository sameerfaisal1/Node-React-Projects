// =============================================
// server.js
// This is the ENTRY POINT of our backend app
// It sets up Express and starts the server
// =============================================

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ── MIDDLEWARE ────────────────────────────────
// Middleware runs before every request

// Allow frontend (React) to talk to backend
app.use(
  cors({
    origin: "http://localhost:5173", // Vite default port
  }),
);

// Parse incoming JSON data from requests
app.use(express.json());

// ── ROUTES ────────────────────────────────────
// All student routes start with /api/students
app.use("/api/students", studentRoutes);

// ── DEFAULT ROUTE ─────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "Student Management API is running!" });
});

// ── START SERVER ──────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
