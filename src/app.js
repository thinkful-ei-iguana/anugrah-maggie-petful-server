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


app.get('/', (req, res) => {
  res.send('hey hey');
});

app.use('/api/cats', catsRouter.getRouter());
app.use('/api/dogs', dogsRouter.getRouter());
app.use('/api/humans', humansRouter.getRouter());

function adoptionLoopTick() {

  let promiseLoop = new Promise((resolve) => {
    console.log('running the loop');
    // while there are people in the queue
    if (humansRouter.getService().getQueue().length > 0) {
      console.log('found people in queue', humansRouter.getService().getQueue().length);
      // wait for person to make a pet selection
      let adoptionTimeout = setTimeout(() => {
        console.log('adoption timeout');
        // if person runs out of time
        // force person to end of the queue
        humansRouter.getService().deleteHuman();
        promiseLoop = promiseLoop.then(adoptionLoopTick());
        resolve();
      }, 1500);

      let adoptedPet = () => {
        clearTimeout(adoptionTimeout);
        promiseLoop = promiseLoop.then(adoptionLoopTick());
        resolve();
      };
      // if person makes pet selection
      // dequeue pet, dequeue human
      // re-enqueue pet, re-enqueue human
      catsRouter.listenForAdoption(() => {
        console.log('user adopted cat');
        adoptedPet();
      });

      dogsRouter.listenForAdoption(() => {
        console.log('user adopted dog');
        adoptedPet();
      });
    }
  });

  return promiseLoop;
}
adoptionLoopTick();

module.exports = app;