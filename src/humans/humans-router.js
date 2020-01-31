const express = require('express');
const HumansService = require('./humans-service');

const humansRouter = express.Router();
const jsonParser = express.json();


humansRouter
  .route('/')
  .get((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://pawsibilities.now.sh');
    let allHumans = HumansService.getHumans();
    res
      .json(allHumans);
  })
  .delete((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://pawsibilities.now.sh');
    res
      .status(200)
      .send(HumansService.deleteHuman());
  });

humansRouter
  .route('/post')
  .post(jsonParser, (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://pawsibilities.now.sh');
    const { name } = req.body;
    let newName = { name };

    let currentLineToAdopt = HumansService.postHuman(name);
    res.json()
  })

module.exports = humansRouter;