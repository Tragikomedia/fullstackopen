const { model, Schema } = require('mongoose');
const User = require('./user');
const { CustomError } = require('../utils/error');

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

blogSchema.statics.fromReq = async function (req) {
  const { title, author, url, likes } = req.body;
  const {token} = req;
  const user = await User.findFromToken(token);
  if (!user) throw CustomError('ValidationError', 'Invalid user token');
  const newBlog = new this({ title, author, url, likes, user });
  return newBlog;
};

module.exports = model('Blog', blogSchema);
