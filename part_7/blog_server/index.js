const app = require('./app');
const db = require('./utils/db');
const config = require('./utils/config');
const logger = require('./utils/logger');

const main = async () => {
  await db.connect();
  app.listen(config.PORT, () =>
    logger.info(`Server listening at port ${config.PORT}`)
  );
};

main();
