const { model, Schema } = require('mongoose');

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
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

blogSchema.statics.fromReq = function(req) {
  const { title, author, url, likes } = req.body;
  const newBlog = new this({ title, author, url, likes });
  return newBlog;
};

module.exports = model('Blog', blogSchema);
