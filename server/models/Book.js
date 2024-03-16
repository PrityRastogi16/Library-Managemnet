const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const BookModel = mongoose.model('Book', bookSchema);
module.exports = {
     BookModel
}