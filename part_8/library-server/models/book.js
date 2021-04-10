const { model, Schema } = require('mongoose');

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 1
  },
  published: {
    type: Number,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author',
    required: true,
  },
  genres: {
    type: [{ type: String }],
    default: []
  },
});

module.exports = model('Book', bookSchema);
