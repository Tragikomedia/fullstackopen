const express = require('express');
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const middlewares = require('./utils/middlewares');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

app.use('/api/blogs', blogsRouter);

app.use(middlewares.unknownPath);
app.use(middlewares.errorHandler);

module.exports = app;
