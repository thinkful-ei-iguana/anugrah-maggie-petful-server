const express = require('express');
const HumansService = require('./humans-service');

const humansRouter = express.Router();
const jsonParser = express.json();


humansRouter
  .route('/')
  .get((req, res) => {
    let allHumans = HumansService.getHumans();
    res
      .json(allHumans);
  })
  .delete((req, res) => {
    res
      .status(200)
      .send(HumansService.deleteHuman());
  })
  .post(jsonParser, (req, res) => {
    const { name } = req.body;
    let newHuman = { name };
    console.log('newhuman is', newHuman);

    let currentLineToAdopt = HumansService.postHuman(newHuman);
    res
      .status(200)
      .json(currentLineToAdopt);
  });

module.exports = humansRouter;