const mongoose = require("mongoose");
// User Schema for MongoDB database using mongoose ORM (Object Relational Mapping) to interact with MongoDB database
const userSchema = new mongoose.Schema({
    // User Schema fields
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = { User }; // exporting the User model
