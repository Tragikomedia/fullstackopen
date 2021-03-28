const { model, Schema } = require('mongoose');
const { hashPassword } = require('../utils/user_helper');
const { CustomError } = require('../utils/error');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

userSchema.statics.fromReq = async function (req) {
  const { username, name, password } = req.body;
  if (!(username && name && password)) throw CustomError('ValidationError', 'Username, name and password must be provided');
  const passwordHash = await hashPassword(password);
  return new this({
    username,
    name,
    passwordHash,
  });
};

module.exports = model('User', userSchema);
