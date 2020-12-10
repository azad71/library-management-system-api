// import dependencies
// load libraries
const validator = require("validator");

// load utility functions
const isEmpty = require("../../utils/isEmpty.js");

module.exports = function validateSignUpInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  // data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.role = !isEmpty(data.role) ? data.role : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : "";


  // check for name length
  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  // check if name is provided
  if (validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }
  
  // // check for username length
  // if (!validator.isLength(data.username, { min: 2, max: 100 })) {
  //   errors.username = "Username must be between 2 and 30 characters";
  // }

  // // check if username is provided
  // if(validator.isEmpty(data.username)) {
  //   errors.username = "Username is required";
  // }

    
  // check for email validity
  if (!validator.isEmail(data.email)) {
    errors.email = "Invalid Email";
  }

  // check if email is provided
  if(validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  // role should be either student or librarian
  if(!validator.isIn(data.role, ['student', 'librarian'])) {
    errors.role = "Invalid role";
  } 

  // check if role is provided
  if(validator.isEmpty(data.role)) {
    errors.role = "User role is required";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm password is required";
  }

  if (!validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Password doesn't match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
