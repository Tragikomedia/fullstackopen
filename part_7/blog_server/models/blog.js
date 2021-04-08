const { model, Schema } = require('mongoose');
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
  comments: {
    type: [String],
    default: [],
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
  const user = req.user;
  if (!user) throw CustomError('ValidationError', 'Invalid user token');
  const newBlog = new this({ title, author, url, likes, user: user._id });
  return newBlog;
};

module.exports = model('Blog', blogSchema);
