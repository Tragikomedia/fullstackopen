const logger = require('./logger');

const unknownPath = (req, res) => res.status(404).end();

const errorHandler = (error, req, res, next) => {
  logger.error(error);
  if (error.name) {
    return res.status(500).end();
  }
  next(error);
};

module.exports = { errorHandler, unknownPath };
