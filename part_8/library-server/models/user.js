const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    minLength: 3,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  favoriteGenre: {
    type: String,
    required: true,
    minLength: 1,
  },
});

module.exports = model('User', userSchema);
