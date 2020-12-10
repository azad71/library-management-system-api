// import libs 
const { isMongoId } = require('validator');

// import db models 
const Book = require('../../models/book.js');

// @desc fetch single book by id 
exports.getBook = async (req, res) => {
  try {
    
    // get the book id 
    let bookId = req.params.bookId;

    // validate bookId 
    if(!isMongoId(bookId)) return res.status(400).json({error: "Invalid book id"});

    // fetch book record by id 
    const foundBook = await Book.findById(bookId);

    // check if book exists 
    if(!foundBook) return res.status(404).json({error: "No book found"});

    // send response
    return res.json({
      book: foundBook
    })

  } catch (error) {
    console.log(error); // for dev purpose
    return res.status(500).json({error: error.message});
  }
}

// @desc get all books
exports.getBooks = async (req, res) => {
  try {
    
    const foundBooks = await Book.find();

    return res.json({
      books: foundBooks
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({error: error.message});
  }
}