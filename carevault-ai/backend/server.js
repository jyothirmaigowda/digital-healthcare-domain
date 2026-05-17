require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const { connectDB } = require("./config/database");
const seedDemoData = require("./config/seedDemoData");

// Routes
const authRoutes = require("./routes/authRoutes");
const recordRoutes = require("./routes/recordRoutes");
const aiRoutes = require("./routes/aiRoutes");

// Middleware
const { errorHandler, notFound } = require("./middleware/errorHandler");

const app = express();

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "http://localhost:5000",
  "http://127.0.0.1:5000",
  "http://localhost:8080",
  "http://127.0.0.1:8080",
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving (uploads)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/ai", aiRoutes);

// Health route
app.get("/", (req, res) => {
  res.send("CareVault AI Backend Running");
});

// Serve frontend from the backend in local development.
app.use(express.static(path.join(__dirname, "../frontend")));
app.get("/app", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Error handlers (must be last)
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await seedDemoData();

    app.listen(PORT, () => {
      console.log("");
      console.log("=======================================");
      console.log(`Server running on port ${PORT}`);
      console.log(`http://localhost:${PORT}`);
      console.log("=======================================");
    });
  } catch (error) {
    console.error("Server startup failed because MongoDB is unavailable.");
    process.exit(1);
  }
};

startServer();
