const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  booksOwned: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
  }],
});

const UserModel = mongoose.model('User', userSchema);
module.exports={
    UserModel
}