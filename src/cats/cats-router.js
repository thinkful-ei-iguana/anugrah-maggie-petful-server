const express = require('express');
const CatsService = require('./cats-service');

const catsRouter = express.Router();
const jsonParser = express.json();


catsRouter
  .route('/')
  .get((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://pawsibilities.now.sh');
    const allCats = CatsService.getCats();
    console.log('getting cats', allCats);
    return res
      .json(allCats);
  })
  // .post(jsonParser, (req, res, next) => {
  //   res.setHeader('Access-Control-Allow-Origin', 'https://pawsibilities.now.sh');
  //   const { imageURL, imageDescription, name, sex, age, breed, story } = req.body;
  //   const newCat = { imageURL, imageDescription, name, sex, age, breed, story };

  //   return res
  //     .status(201)
  //     .json(serializeCat())


  // })
  .delete((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://pawsibilities.now.sh');
    console.log('deleting cats');
    return res
      .status(200)
      .send(CatsService.deleteCat());
  });

module.exports = catsRouter;