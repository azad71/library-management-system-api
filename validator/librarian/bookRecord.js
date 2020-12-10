// import dependencies
// load libraries
const validator = require("validator");

// load utility functions
const isEmpty = require("../../utils/isEmpty.js");

function validateBookRecordInput(data) {
  let errors = {};

  data.bookName = !isEmpty(data.bookName) ? data.bookName : "";
  data.author = !isEmpty(data.author) ? data.author : "";
  data.genre = !isEmpty(data.genre) ? data.genre : "";
  data.releaseDate = !isEmpty(data.releaseDate) ? data.releaseDate : "";

  // check for book name length
  if (!validator.isLength(data.bookName, { min: 2 })) {
    errors.bookName = "Book name must be at least 2 character";
  }

  // check if book name is provided
  if (validator.isEmpty(data.bookName)) {
    errors.bookName = "Book name is required";
  }
  
  // check for author name length
  if (!validator.isLength(data.author, { min: 5, max: 50 })) {
    errors.author = "author name must be between 5 and 50 characters";
  }

  // check if author name is provided
  if (validator.isEmpty(data.author)) {
    errors.author = "author name is required";
  }

  // check for genre length
  if (!validator.isLength(data.genre, { min: 3, max: 20 })) {
    errors.genre = "genre  must be between 3 and 20 characters";
  }

  // check if genre name is provided
  if (validator.isEmpty(data.genre)) {
    errors.genre = "genre is required";
  }

  // check for date validation
  try {
    // first check if date is provided
    if(validator.isEmpty(data.releaseDate)) errors.releaseDate = "Release date is requrired";
    
    // then check for valid type
    let date = new Date(data.releaseDate).toISOString().split('T')[0];
    if(!validator.isDate(date)) errors.releaseDate = "Invalid release date";
  } catch (error) {
    errors.releaseDate = "Invalid release date"
  }

  
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateBookRecordInput;
