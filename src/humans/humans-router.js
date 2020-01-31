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
  });

humansRouter
  .route('/post')
  .post(jsonParser, (req, res) => {
    const { name } = req.body;
    let newName = { name };

    let currentLineToAdopt = HumansService.postHuman(name);
    res.json()
  })

module.exports = humansRouter;