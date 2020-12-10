// this file centralize all routes 
// clear up the route clutter in app.js

// import lib
const router = require('express').Router();
const passport = require('passport')

// import middlewars
const isLibrarian = require('./middleware/isLibrarian.js');

// import api endpoints
const authAPI = require('./api/auth.js');
const librarianAPI = require('./api/librarian.js');
const studentAPI = require('./api/student.js');


// tunnel routes 
router.use('/api', authAPI);
router.use('/api', passport.authenticate('jwt', { session: false }), studentAPI);
router.use('/api', passport.authenticate('jwt', {session: false}), isLibrarian, librarianAPI);



// export router
module.exports = router;
