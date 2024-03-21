// dbConnection.js
const mongoose = require('mongoose');
//const config=require("config");
const DB_URI="mongodb+srv://anwar:anwar@atlascluster.qvfmktf.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster"
const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log('MongoDB connection established');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = { connectToDatabase };
