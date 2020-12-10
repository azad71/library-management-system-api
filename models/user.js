// import libs
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    trim: true,
  },

  email: {
    type: String,
    trim: true,
    required: true,
  },

  role: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

}, {timestamps: true})

module.exports = mongoose.model('User', userSchema);