// import libs
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({

  bookName: {
    type: String,
    minlength: 2,
    required: true,
    trim: true,
  },

  author: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
    trim: true,
  },

  genre: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
    trim: true,
  },

  releaseDate: {
    type: Date,
    required: true,
  },

  bookImage: {
    type: String,
    required: true,
  }
}, {timestamps: true});

module.exports = mongoose.model('Book', bookSchema);