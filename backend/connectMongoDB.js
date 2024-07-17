const mongoose = require('mongoose');
require('dotenv').config(); // Ensure dotenv is loaded

const mongodbURI = process.env.MONGODB_URI;

async function connectMongoDB() {
  try {
    await mongoose.connect(mongodbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
    return mongoose; // Return the mongoose instance
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err; // Rethrow the error to handle it in server.js
  }
}

module.exports = connectMongoDB;
