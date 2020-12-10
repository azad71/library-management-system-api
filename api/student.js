// import libs 
const router = require('express').Router();

// import controllers
const getBookController = require('../controllers/student/get.js');


// @route POST api/book/:bookId 
// @desc get book record by id
// @access Private -> librarian, student 
router.get('/book/:bookId', getBookController.getBook);

// @route POST api/book/ 
// @desc get all book records
// @access Private -> librarian, student 
router.get('/book', getBookController.getBooks);


module.exports = router;