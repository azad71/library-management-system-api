// import libs 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { escape } = require('validator');


// import db model
const User = require('../../models/user.js');

// import validators
const validateSignUpInput = require('../../validator/auth/register.js');
const validateLoginInput = require('../../validator/auth/login.js');

// import environment variables for dev
if (process.env.NODE_ENV !== "production") require("dotenv").config();

// @desc register an user 
exports.postRegister = async (req, res) => {
  try {
    
    // validate input 
    const { errors, isValid } = validateSignUpInput(req.fields);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // destructure properties
    // formidable populates form data into req.fields 
    let {name, email, password, role } = req.fields;

    // hold on fellas, gotta clean up first
    name = escape(name);
    // username = escape(username);
    role = escape(role);

    // wait! what about password and email
    // password gonna be hashed anyway and 
    // for email, dude! pass the regex first!

    // check if this user exists already
    const isExist = await User.findOne({email});
    if(isExist) return res.status(400).json({error: "User with this email already registered"})
    
    // hash password
    password = await bcrypt.hash(password, 12);
    
    // create new user object 
    const newUser = new User({ name, role, email, password });
    await newUser.save();
    
    // return response
    return res.json({
      message: "new user created, please login to continue",
    })
  } catch (error) {
    console.log(error); // for dev purpose, omitted in production
    return res.status(500).json({error: error.message})
  }
}

// @desc check given credential and login an user;
exports.postLogin = async (req, res) => {
  try {

     // validate input 
     const { errors, isValid } = validateLoginInput(req.fields);
     if (!isValid) {
       return res.status(400).json(errors);
     }

    // destructure credentials
    let {email, password} = req.fields;

    // yo, no sanitzer this time?
    // nope, no db write, no sanitzing

    const user = await User.findOne({email});
    // check if user exists
    if(!user) {
      errors.email = "User with this email not found";
      return res.status(404).json(errors);
    }

    // alright! user found in db. let's match the password
    const isMatch = await bcrypt.compare(password, user.password);
    if(isMatch) {
      // create the payload
      const payload = {
        _id: user._id,
        name: user.name,
        email: user.email, 
        role: user.role
      };
      
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY)
      
      // return response
      return res.json({
        message: "Logged in successfully",
        token: `Bearer ${token}`
      })
    } else {
      errors.password = "Wrong password";
      return res.json(errors);
    }

  } catch (error) {
    console.log(error); // for dev purpose, omitted in production
    return res.status(500).json({error: error.message})
  }
}

