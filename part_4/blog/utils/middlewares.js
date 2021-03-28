const User = require('../models/user');
const logger = require('./logger');
require('express-async-errors');

const unknownPath = (req, res) => res.status(404).end();

const tokenExtractor = (req) => {
  const authorization = req.get('Authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer'))
    return authorization.slice(7);
};

const userExtractor = async (req, res, next) => {
  const token = tokenExtractor(req);
  if (token) {
    const user = await User.findFromToken(token);
    if (user) req.user = user;
  }
  next();
};

const errorHandler = (error, req, res, next) => {
  logger.error(error);
  if (error.name) {
    switch (error.name) {
    case 'ValidationError': {
      if (
        error.message.startsWith(
          'User validation failed: username: Error, expected `username` to be unique.'
        )
      )
        error.message = 'Username must be unique';
      return res.status(400).json({ error: error.message });
    }
    case 'CastError': {
      return res.status(400).json({ error: 'Malformatted id' });
    }
    case 'JsonWebTokenError': {
      return res.status(401).json({ error: 'Invalid token' });
    }
    case 'TokenExpiredError': {
      return res.status(401).json({ error: 'Token expired' });
    }
    default: {
      return res.status(500).end();
    }
    }
  }
  next(error);
};

module.exports = { errorHandler, unknownPath, userExtractor };
