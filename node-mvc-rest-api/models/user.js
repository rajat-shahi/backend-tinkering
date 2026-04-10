const mongoose = require("mongoose");

// created schema for the DB
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// now, we have to create the Model so that we can use it for writing and reading data
const User = mongoose.model("users", userSchema);

module.exports = User;
