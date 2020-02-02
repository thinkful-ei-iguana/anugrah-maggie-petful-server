const express = require('express');
const HumansService = require('./humans-service');

class HumansRouter {
  constructor() {
    this.humansService = new HumansService();
    this.humansRouter = express.Router();
    const jsonParser = express.json();

    this.humansRouter
      .route('/')
      .get((req, res) => {
        let allHumans = this.humansService.getHumans();
        res
          .json(allHumans);
      })
      .delete((req, res) => {
        res
          .status(200)
          .send(this.humansService.deleteHuman());
      })
      .post(jsonParser, (req, res) => {
        const { name } = req.body;
        let newHuman = {
          name: name,
          ip: req.ip
        };
        console.log('newhuman is', newHuman.name);

        let currentLineToAdopt = this.humansService.postHuman(newHuman);
        console.log('current line to adopt', currentLineToAdopt);
        res
          .status(200)
          .json(currentLineToAdopt);
      });
  }

  getRouter() {
    return this.humansRouter;
  }

  getService() {
    return this.humansService;
  }
}

module.exports = HumansRouter;