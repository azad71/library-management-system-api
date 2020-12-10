
// import libs 
const {escape} = require('validator');

// import db model
const Book = require('../../models/book.js');

// import validators
const validateBookRecordInput = require('../../validator/librarian/bookRecord.js');

// import utility functions
const validateMimeType = require('../../utils/validateMimeType.js');

// import image library funciton
const addImage = require('../../lib/addImage.js');

// @desc add book record to db 
exports.postAddBookRecord = async (req, res) => {
  try {

    // validate input 
    const { errors, isValid } = validateBookRecordInput(req.fields);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // destructure properties
    let {bookName, author, genre, releaseDate} = req.fields;
    // get image via req.files 
    let {bookImage} = req.files;

    // sanitize textual data
    bookName = escape(bookName);
    author = escape(author);
    genre = escape(genre);
    releaseDate = escape(releaseDate);

    // check if image provided
    if(!bookImage.size) return res.status(404).json({error: "No image selected"});

    // check for valid mime type
    if(!validateMimeType(bookImage)) return res.status(400).json({error: "Invalid image type"});

    let imageFullPath = await addImage(bookImage, req.publicDir);

    // let's save book info to db
    let newBookRecord = new Book({
      bookName, author, genre, releaseDate,
      bookImage: imageFullPath
    })

    await newBookRecord.save();
    
    res.json({message: "Book added successfully"})
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: error.message});
  }

}