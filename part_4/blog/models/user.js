const { model, Schema } = require('mongoose');
const { hashPassword } = require('../utils/user_helper');
const { CustomError } = require('../utils/error');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: [3, 'Username must be at least 3 characters long'],
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

userSchema.plugin(uniqueValidator);

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
  if (!(username && name && password))
    throw CustomError(
      'ValidationError',
      'Username, name and password must be provided'
    );
  if (password.length < 3)
    throw CustomError(
      'ValidationError',
      'Password must be at least 3 characters long'
    );
  const passwordHash = await hashPassword(password);
  return new this({
    username,
    name,
    passwordHash,
  });
};

module.exports = model('User', userSchema);
