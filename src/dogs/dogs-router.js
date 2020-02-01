const express = require('express');
const DogsService = require('./dogs-service');


class DogsRouter {
  constructor() {
    this.dogsRouter = express.Router();
    this.jsonParser = express.json();

    this.dogsRouter
      .route('/')
      .get((req, res) => {
        const allDogs = DogsService.getDogs();
        return res
          .json(allDogs);
      })
      .delete((req, res, next) => {
        return res
          .status(200)
          .send(DogsService.deleteDog())
          .then(() => {
            if (this.adoptionCallback) {
              this.adoptionCallback();
            }
          });
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
    return this.dogsRouter;
  }

  listenForAdoption(cb) {
    this.adoptionCallback = cb;
  }
}

module.exports = DogsRouter;