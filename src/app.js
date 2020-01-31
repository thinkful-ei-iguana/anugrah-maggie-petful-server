const express = require('express');
const catsRouter = require('./cats/cats-router');
const dogsRouter = require('./dogs/dogs-router');

const app = express();

const jsonParser = express.JSON();

app.route('/api').post(jsonParser, (req, res, next) => {
  res.send('hello world. -server');
});

app.use('/api/cats', catsRouter);
app.use('/api/dogs', dogsRouter);

module.exports = app;