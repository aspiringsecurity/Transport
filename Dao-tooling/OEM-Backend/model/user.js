const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minLength: 5,
    maxLength: 15,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  walletAddress: {
    type: String,
    // minLength: 18,
    //maxLength: 15,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("User", userSchema);
