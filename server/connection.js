const mongoose = require("mongoose");

const connect = async (url) => {
  try {
    // Connect to MongoDB
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (error) {
    // Log and handle connection errors
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit with failure
  }
};

module.exports = connect;
