const express = require('express');
const cors = require('cors');
const config = require('./utils/config');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middlewares = require('./utils/middlewares');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

app.use('/api/blogs', middlewares.userExtractor, blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (config.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/test');
  app.use('/api/testing', testingRouter);
}

app.use(middlewares.unknownPath);
app.use(middlewares.errorHandler);

module.exports = app;
