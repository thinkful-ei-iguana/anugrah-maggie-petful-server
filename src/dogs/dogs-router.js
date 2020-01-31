const express = require('express');
const DogsService = require('./dogs-service');

const dogsRouter = express.Router();
const jsonParser = express.json();


dogsRouter
  .route('/')
  .get((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://pawsibilities.now.sh');
    const allDogs = DogsService.getDogs();
    return res
      .json(allDogs);
  })
  .delete((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://pawsibilities.now.sh');
    return res
      .status(200)
      .send(DogsService.deleteDog());
  });

module.exports = dogsRouter;