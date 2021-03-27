const logger = require('./logger');

const unknownPath = (req, res) => res.status(404).end();

const errorHandler = (error, req, res, next) => {
  logger.error(error);
  if (error.name) {
    switch (error.name) {
    case 'ValidationError': {
      return res
        .status(400)
        .json({ error: 'You must provide title and url.' });
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
