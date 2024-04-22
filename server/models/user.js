const mongoose = require('mongoose');

// Define the schema for users
const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        unique: true,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    Password: {
        type: String,
        required: true
    }
});

// Create a model for users
const User = mongoose.model('User', userSchema);

module.exports = User;
