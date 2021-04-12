const mongoose = require('mongoose');
const config = require('../config/env');

const init = async () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  };
  try {
    await mongoose.connect(config.DATABASE_URL, options);
    console.log('Connected to MongoDB');
  } catch {
    console.error('Could not connect to the database...');
  }
};
module.exports = { init };
