// import libs 
const router = require('express').Router();

// import controller
const postBookController = require('../controllers/librarian/post.js');
const updateBookController = require('../controllers/librarian/update.js');
const deleteBookController = require('../controllers/librarian/delete.js');

// @route POST api/book/add
// @desc add book record
// @access Private -> librarian
router.post('/book/add', postBookController.postAddBookRecord);

// @route POST api/book/update/:bookId 
// @desc update book record
// @access Private -> librarian
router.post('/book/update/:bookId', updateBookController.updateBookRecord);

// @route DELETE api/book/delete/:bookId 
// @desc delete book record
// @access Private -> librarian
router.delete('/book/delete/:bookId', deleteBookController.deleteBookRecord);


module.exports = router;