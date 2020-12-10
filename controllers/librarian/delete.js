// import libs 
const { isMongoId } = require('validator');
const fs = require('fs');

// import db model
const Book = require('../../models/book.js');


// @desc delete a book record by bookId
exports.deleteBookRecord = async (req, res) => {
  try {

    // get the book id 
    let bookId = req.params.bookId;

    // validate objectId
    if(!isMongoId(bookId)) return res.status(400).json({error: "Invalid book id"});

    // check if exists in db 
    let foundBook = await Book.findById(bookId);

    if(!foundBook) return res.status(404).json({error: "No book found to delete"});

    // delete the image 
    if(fs.existsSync(foundBook.bookImage)) {
      fs.unlinkSync(foundBook.bookImage);
    }

    // delete book record from db 
    await foundBook.delete();
    
    return res.json({
      message: "Book deleted successfully",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({error: error.message});
  }

}