const { model, Schema } = require('mongoose');
const User = require('./user');

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
  const users = await User.find({});
  const user = users[0]._id;
  const newBlog = new this({ title, author, url, likes, user });
  return newBlog;
};

module.exports = model('Blog', blogSchema);
