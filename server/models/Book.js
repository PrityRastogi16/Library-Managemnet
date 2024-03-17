const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
    rentPrice: Number,
    buyPrice: Number,
    status: {type:String, enum:["available", "rented", "sold"], default:"available"},
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const BookModel = mongoose.model('Book', bookSchema);
module.exports = {
     BookModel
}