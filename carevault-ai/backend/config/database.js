/**
 * MongoDB connection configuration.
 */

const mongoose = require("mongoose");

const getMongoUri = () => process.env.MONGODB_URI || process.env.MONGO_URI;

// Connect to MongoDB
const connectDB = async () => {
  const mongoUri = getMongoUri();

  if (!mongoUri) {
    throw new Error(
      "MongoDB URI is missing. Set MONGODB_URI or MONGO_URI in backend/.env"
    );
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    throw error;
  }
};

// Disconnect from MongoDB (optional)
const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  } catch (error) {
    console.error(`MongoDB disconnection error: ${error.message}`);
  }
};

module.exports = { connectDB, disconnectDB };
