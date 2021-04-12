const { model, Schema } = require('mongoose');

const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
  },
  born: {
    type: Number,
  },
  books: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Book',
      },
    ],
    default: [],
  },
});

module.exports = model('Author', authorSchema);
