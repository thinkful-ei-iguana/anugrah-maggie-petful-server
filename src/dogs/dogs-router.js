const express = require('express');
const DogsService = require('./dogs-service');

const dogsRouter = express.Router();
const jsonParser = express.json();


dogsRouter
  .route('/')
  .get((req, res) => {
    const allDogs = DogsService.getDogs();
    return res
      .json(allDogs);
  })
  .delete((req, res, next) => {
    return res
      .status(200)
      .send(DogsService.deleteDog());
  });

module.exports = dogsRouter;