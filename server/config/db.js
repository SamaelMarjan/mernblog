const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONN);
    console.log("Successfully connected to database");
  } catch (error) {
    console.log("Database connection failed");
  }
};

module.exports = connectDB;
