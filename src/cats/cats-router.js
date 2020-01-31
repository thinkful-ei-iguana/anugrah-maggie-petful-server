const express = require('express');
const CatsService = require('./cats-service');

const catsRouter = express.Router();

catsRouter
  .route('/')
  .get((req, res) => {
    const allCats = CatsService.getCats();
    console.log('getting cats', allCats);
    return res
      .json(allCats);
  })
  .delete((req, res, next) => {
    console.log('deleting cats');
    return res
      .status(200)
      .send(CatsService.deleteCat());
  });

module.exports = catsRouter;