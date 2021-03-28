const logger = require('./logger');

const unknownPath = (req, res) => res.status(404).end();

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
    default: {
      return res.status(500).end();
    }
    }
  }
  next(error);
};

module.exports = { errorHandler, unknownPath };
