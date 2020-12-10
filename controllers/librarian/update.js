// import libs 
const { escape, isMongoId } = require('validator');
const fs = require('fs');

// import db model
const Book = require('../../models/book.js');

// import validators
const validateBookRecordInput = require('../../validator/librarian/bookRecord.js');

// import utility functions
const validateMimeType = require('../../utils/validateMimeType.js');

// import image library funciton
const addImage = require('../../lib/addImage.js');

// @desc update book record 
exports.updateBookRecord = async (req, res) => {
  try {

    // validate input 
    const { errors, isValid } = validateBookRecordInput(req.fields);
    if (!isValid) return res.status(400).json(errors);
    
    let bookId = req.params.bookId;

    // validate objectId
    if(!isMongoId(bookId)) return res.status(400).json({error: "Invalid book id"});

    // destructure properties
    let {bookName, author, genre, releaseDate} = req.fields;
    // get image via req.files 
    let {bookImage} = req.files;
  
    // sanitize textual data
    bookName = escape(bookName);
    author = escape(author);
    genre = escape(genre);
    releaseDate = escape(releaseDate);

    // pull up existing book record from db 
    const foundBook = await Book.findById(bookId);

    // check if this record exists
    if(!foundBook) return res.status(404).json({error: "No book found"});
    
    let imageFullPath = foundBook.bookImage;

    // update record with latest image if provided one
    if(bookImage && bookImage.size > 0) {
      
      // check for valid mime type
      if(!validateMimeType(bookImage)) return res.status(400).json({error: "Invalid image type"});
    
      // unlink old image 
      if(fs.existsSync(imageFullPath)) {
        fs.unlinkSync(imageFullPath);
      }

      // get new image path 
      imageFullPath = await addImage(bookImage, req.publicDir);
    }
    
    // update book record
    foundBook.bookName = bookName;
    foundBook.author = author;
    foundBook.genre = genre;
    foundBook.releaseDate = releaseDate;
    foundBook.bookImage = imageFullPath;

    // save to db
    let updatedBook = await foundBook.save();
    
    return res.json({
      message: "Book updated successfully",
      updatedBook,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: error.message});
  }

}