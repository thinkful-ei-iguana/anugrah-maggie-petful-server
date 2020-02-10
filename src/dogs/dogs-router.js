const express = require('express');
const DogsService = require('./dogs-service');


class DogsRouter {
  constructor() {
    this.dogsService = new DogsService();
    this.dogsRouter = express.Router();
    this.jsonParser = express.json();

    let deletedDog = null;
    this.dogsRouter
      .route('/')
      .get((req, res) => {
        const allDogs = this.dogsService.getDogs();
        return res
          .json(allDogs);
      })
      .delete((req, res, next) => {
        if (this.adoptionCallback) {
          deletedDog = this.adoptionCallback();
        }
        return res
          .status(200)
          .send(JSON.stringify(deletedDog));
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

  getService() {
    return this.dogsService;
  }

  listenForAdoption(cb) {
    this.adoptionCallback = cb;
  }
}

module.exports = DogsRouter;
