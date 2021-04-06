const mongoose = require('mongoose');
const config = require('./config');
const logger = require('./logger');

const connect = async () => {
  try {
    await mongoose.connect(
      config.DATABASE_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      },
      () => logger.info('Connected to DB')
    );
  } catch (error) {
    logger.error(error);
  }
};

const disconnect = () => {
  mongoose.connection.close();
};

module.exports = { connect, disconnect };
