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
});

module.exports = model('Author', authorSchema);
