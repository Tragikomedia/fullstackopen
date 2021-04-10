const server = require('./server');
const db = require('./config/db');

const main = async () => {
  await db.init();
  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
};

main();