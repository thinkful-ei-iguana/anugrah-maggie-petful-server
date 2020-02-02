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

let listOfClients = new Map();
let eventId = 0;
app.use(compression());
app.get('/api/updateEvent', (req, res) => {
  if (listOfClients.has(req.ip)) {
    console.log('already have client');
  }
  else {
    console.log('adding new client', req.ip);
    const headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    };
    res
      .writeHead(200, headers);
    res.write(`data: ${JSON.stringify({
      humans: humansRouter.getService().getQueue().map(human => human.name),
      isItYourTurn: false
    })}\n\n`);
    res.flush();
    listOfClients.set(req.ip, res);
  }
  // setInterval(() => {
  //   res
  //     // OMG OMG IT NEEDS:
  //     // * 'data: ' to precede ANYTHING ELSE
  //     // * '\n\n' needs to succeed EVERYTHING
  //     //.write(`data: hello world ${Date.now()}\n\n`);
  //     .write(`data: ${JSON.stringify(humansRouter.getService().getQueue())}\n\n`);
  //   res.flush();
  // }, 2000);
});

app.use('/api/cats', catsRouter.getRouter());
app.use('/api/dogs', dogsRouter.getRouter());
app.use('/api/humans', humansRouter.getRouter());

function adoptionLoopTick() {

  let promiseLoop = new Promise((resolve) => {
    console.log('* LOOP TICK: running the loop');
    console.log('** LOOP TICK: found people in queue', humansRouter.getService().getQueue().length);

    let replyToClients = () => {
      eventId++;
      // for (let [reqClient, response] of Object.entries(listOfClients)) {
      console.log('ip is', humansRouter.getService().getQueue()[0].ip);
      console.log("length of people queue:", humansRouter.getService().getQueue().length);
      console.log('list of clients:', listOfClients.size);
      for (let element of listOfClients.entries()) {
        let reqClient = element[0];
        let response = element[1];
        let isItYourTurn = false;
        // console.log('here is', humansRouter.getService().getQueue()[0].ip);
        console.log('reqclient is', reqClient);
        if (humansRouter.getService().getQueue().length > 0 &&
          reqClient === humansRouter.getService().getQueue()[0].ip) {
          isItYourTurn = true;
        }
        // console.log('reply to client', humansRouter.getService().getQueue());

        response.write(`data: ${JSON.stringify({
          humans: humansRouter.getService().getQueue().map(human => human.name),
          isItYourTurn: isItYourTurn,
          id: eventId
        })}\n\n`);
        response.flush();
      }

      resolve();
    };

    // wait for person to make a pet selection
    let adoptionTimeout = setTimeout(() => {
      console.log('*** LOOP TICK: adoption timeout');
      // if person runs out of time
      // force person to end of the queue
      humansRouter.getService().deleteHuman();
      replyToClients();
    }, 5000);

    let adoptedPet = () => {
      clearTimeout(adoptionTimeout);
      replyToClients();
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
  })
    .then(() => {
      adoptionLoopTick();
    });

  return promiseLoop;
}
adoptionLoopTick();

module.exports = app;