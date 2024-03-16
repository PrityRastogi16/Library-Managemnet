const express = require('express');
const bookRouter = express.Router();
const {BookModel} = require("../models/Book");

// Create a new book
bookRouter.post('/add', async (req, res) => {
  try {
    const { title, author, description, owner } = req.body;
    const newBook = new BookModel({ title, author, description, owner });
    await newBook.save();
    res.status(201).json({msg:"New Book added",newBook});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all books
bookRouter.get('/', async (req, res) => {
  try {
    const books = await BookModel.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single book
// bookRouter.get('/:id', getBook, (req, res) => {
//   res.json(res.book);
// });

// Update a book
// bookRouter.patch('/:id', getBook, async (req, res) => {
//   if (req.body.title != null) {
//     res.book.title = req.body.title;
//   }
//   if (req.body.author != null) {
//     res.book.author = req.body.author;
//   }
//   if (req.body.description != null) {
//     res.book.description = req.body.description;
//   }
//   try {
//     const updatedBook = await res.book.save();
//     res.json(updatedBook);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Delete a book
// bookRouter.delete('/:id', getBook, async (req, res) => {
//   try {
//     await res.book.remove();
//     res.json({ message: 'Book deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//     console.log(err)
//   }
// });

// async function getBook(req, res, next) {
//   let book;
//   try {
//     book = await Book.findById(req.params.id);
//     if (book == null) {
//       return res.status(404).json({ message: 'Book not found' });
//     }
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
//   res.book = book;
//   next();
// }

module.exports = {bookRouter}
