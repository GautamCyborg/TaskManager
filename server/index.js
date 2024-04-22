const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connect = require("./connection");
const taskroute = require("./routes/task");
const authroute = require("./routes/auth");

// Middleware to parse JSON request bodies
app.use(express.json());
// CORS configuration to allow requests from localhost:3000 and include credentials
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// Cookie parser middleware
app.use(cookieParser());

// Database connection
const url = process.env.MONGO_URL;
const port = process.env.PORT || 5000;
connect(url);

// Route setup
app.use("/", taskroute);
app.use("/auth", authroute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
