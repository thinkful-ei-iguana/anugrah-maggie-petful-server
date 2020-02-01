const compression = require('compression');
const express = require('express');
const CatsRouter = require('./cats/cats-router');
const DogsRouter = require('./dogs/dogs-router');
const HumansRouter = require('./humans/humans-router');
const cors = require('cors');
const morgan = require('morgan');
const { CLIENT_ORIGIN } = require('./config');

const humansRouter = new HumansRouter();
const catsRouter = new CatsRouter();
const dogsRouter = new DogsRouter();

const app = express();

console.log('client origin is', CLIENT_ORIGIN);
app.use(cors({
  origin: CLIENT_ORIGIN
}));

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common';
app.use(morgan(morganSetting));

app.use(compression());
app.get('/api/updateEvent', (req, res) => {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };
  res
    .writeHead(200, headers);
  setInterval(() => {
    res.write(`hello world ${Date.now()}\n`);
    // .write(JSON.stringify(humansRouter.getService().getQueue()));
    res.end();
    res.flush();
  }, 2000);
});

app.use('/api/cats', catsRouter.getRouter());
app.use('/api/dogs', dogsRouter.getRouter());
app.use('/api/humans', humansRouter.getRouter());

function adoptionLoopTick() {

  let promiseLoop = new Promise((resolve) => {
    console.log('* LOOP TICK: running the loop');
    // while there are people in the queue
    if (humansRouter.getService().getQueue().length > 0) {
      console.log('** LOOP TICK: found people in queue', humansRouter.getService().getQueue().length);
      // wait for person to make a pet selection
      let adoptionTimeout = setTimeout(() => {
        console.log('*** LOOP TICK: adoption timeout');
        // if person runs out of time
        // force person to end of the queue
        humansRouter.getService().deleteHuman();
        resolve();
      }, 5000);

      let adoptedPet = () => {
        clearTimeout(adoptionTimeout);
        resolve();
      };
      // if person makes pet selection
      // dequeue pet, dequeue human
      // re-enqueue pet, re-enqueue human
      catsRouter.listenForAdoption(() => {
        console.log('*** LOOP TICK: user adopted cat');
        adoptedPet();
      });

      dogsRouter.listenForAdoption(() => {
        console.log('*** LOOP TICK: user adopted dog');
        adoptedPet();
      });
    }
  })
    .then(() => {
      adoptionLoopTick();
    });

  return promiseLoop;
}
adoptionLoopTick();

module.exports = app;