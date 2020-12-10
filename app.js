// import libs
const express = require('express');
const formidable = require('express-formidable');
const mongoose = require("mongoose");
const passport = require("passport");
const path = require('path');
const cors = require('cors');
const compression = require('compression');



// import router
const router = require('./router.js');

// instantiate app
const app = express();

// import environment variables for dev
if (process.env.NODE_ENV !== "production") require("dotenv").config();


// db config
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB is connected"))
  .catch((error) => console.log(error));

// app config 
const PORT = process.env.PORT || 8000;
app.use(formidable({ multiples: true })); // for parsing file and formData
app.use(passport.initialize()); // auth config for jwt
require("./config/auth")(passport); // ...
app.use(express.static(__dirname + "/images")); // for saving images on app directory
app.use(cors()); // enable all sources
app.use(compression()) // for compressing response

// set public directory for uploading images
app.use((req, res, next) => {
  req.publicDir = path.join(__dirname, 'images');
  next();
})

// out of requirements 
// just to show an landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'))
})


// serve routes
app.use(router);


// spin up server 
app.listen(PORT, () => {
  console.log(`Server is running at: ${PORT}`)
})