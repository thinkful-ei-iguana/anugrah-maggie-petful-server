const express = require('express');
const CatsService = require('./cats-service');


class CatsRouter {
  constructor() {
    this.catsService = new CatsService();
    this.catsRouter = express.Router();
    this.jsonParser = express.json();

    this.catsRouter
      .route('/')
      .get((req, res, next) => {
        const allCats = this.catsService.getCats();
        // console.log('getting cats', allCats);
        return res
          .json(allCats);
      })
      .delete((req, res, next) => {
        if (this.adoptionCallback) {
          this.adoptionCallback();
        }
        return res
          .status(200)
          .send(this.catsService.deleteCat());
      });
    // .post(jsonParser, (req, res, next) => {
    //   const { imageURL, imageDescription, name, sex, age, breed, story } = req.body;
    //   const newCat = { imageURL, imageDescription, name, sex, age, breed, story };

    //   return res
    //     .status(201)
    //     .json(serializeCat())


    // })
  }

  getRouter() {
    return this.catsRouter;
  }

  getService() {
    return this.catsService;
  }

  listenForAdoption(cb) {
    this.adoptionCallback = cb;
  }

}

module.exports = CatsRouter;