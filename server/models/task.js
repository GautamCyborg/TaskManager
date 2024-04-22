const mongoose = require("mongoose");

// Define the schema for tasks
const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: { type: String, default: "Pending" }, // Default status is "Pending"
    priority: Number,
    userAssociated: String
});

// Create a model for tasks
const Task = new mongoose.model("Task", taskSchema);

module.exports = Task;
