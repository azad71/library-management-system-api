// import libs
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

// import db model 
const User = require("../models/user.js");

// load environment variables
require("dotenv").config();

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET_KEY;

module.exports = (passport) => {
  try {
    passport.use(
       new JwtStrategy(opts, async (jwt_payload, done) => {
        const user_id = jwt_payload._id;
        const user = await User.findById(user_id);
        if(user) return done(null, user);
        return done(null, false);
      })
    );
  } catch (error) {
    console.log(error);
    res.status(401).json({error: error.message})
  }
};
