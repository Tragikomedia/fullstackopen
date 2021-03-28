const express = require('express');
const cors = require('cors');
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

app.use(middlewares.unknownPath);
app.use(middlewares.errorHandler);

module.exports = app;
