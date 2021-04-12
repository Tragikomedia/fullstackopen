const server = require('./server');
const db = require('./config/db');

const main = async () => {
  await db.init();
  server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`);
    console.log(`Subscription ready at ${subscriptionsUrl}`);
  });
};

main();
