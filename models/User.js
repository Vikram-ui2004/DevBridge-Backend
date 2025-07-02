const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  photo: String, // Store Cloudinary URL
});

module.exports = mongoose.model("User", userSchema);
