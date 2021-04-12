// const db = require('./config/db');
// const aut = require('./models/author');
// const book = require('./models/book');

// (async () => {
//   await db.init();
//   const books = await book.find({});
//   for (let book of books) {
//     const a = await aut.findById(book.author);
//     a.books = a.books.concat(book._id);
//     await a.save();
//   }
//   const authors = await aut.find({});
//   // for (let author of authors) {
//   //   author.books = [];
//   //   await author.save();
//   // }
//   console.log(authors);
// })();
