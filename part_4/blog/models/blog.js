const { model, Schema } = require('mongoose');

const blogSchema = new Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  url: {
    type: String,
  },
  likes: {
    type: Number,
  },
});

module.exports = model('Blog', blogSchema);
