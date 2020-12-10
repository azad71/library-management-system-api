// import libs
const router = require('express').Router();

// import controller
const authController = require('../controllers/auth/post.js');


// @route POST api/auth/register
// @desc register user
// @access Public
router.post('/auth/register', authController.postRegister);

// @route POST api/auth/login
// @desc login user
// @access Public
router.post('/auth/login', authController.postLogin)

// export module
module.exports = router;