// models/User.js
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'active'],
      default: 'pending'
    },
    otp: {
      type: String
    },
    otpExpires: {
      type: Date
    }
  });

module.exports = mongoose.model('User', userSchema);
