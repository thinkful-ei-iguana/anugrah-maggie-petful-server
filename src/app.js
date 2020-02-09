const compression = require('compression');
const express = require('express');
const session = require('express-session');
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

// console.log('client origin is', CLIENT_ORIGIN);
app.use(cors({
  origin: CLIENT_ORIGIN
}));

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common';
app.use(morgan(morganSetting));

let listOfClients = new Map();
let eventId = 0;
app.use(compression());
app.use(session({
  secret: 'mattocat'
}));
app.get('/api/updateEvent', (req, res) => {
  // let ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  let ip = req.ip;
  console.log('got request from: ', req.session.id);
  req.connection.on('close', () => {
    console.log("closing connection for", ip);

    listOfClients.delete(ip);
  });
  if (listOfClients.has(ip)) {
    console.log('already have client');
  }
  else {
    console.log('adding new client');
    const headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    };
    res.writeHead(200, headers);
    res.write(`data: ${JSON.stringify({
      humans: humansRouter.getService().getQueue().map(human => human.name),
      isItYourTurn: false
    })}\n\n`);
    res.flush();
    listOfClients.set(ip, {
      res: res,
      req: req
    });
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
    // console.log('* LOOP TICK: running the loop');
    // console.log('** LOOP TICK: found people in queue', humansRouter.getService().getQueue().length);

    let replyToClients = () => {
      eventId++;
      // for (let [reqClient, response] of Object.entries(listOfClients)) {
      // console.log('ip is', humansRouter.getService().getQueue()[0].ip);
      // console.log('length of people queue:', humansRouter.getService().getQueue().length);
      // console.log('list of clients:', listOfClients.size);
      console.log(dogsRouter.getService().getDogs()[0].name);
      for (let element of listOfClients.entries()) {
        let reqIp = element[0];
        let resAndReq = element[1];
        let response = resAndReq.res;
        let isItYourTurn = false;
        let currentAdopter = humansRouter.getService().getHumans()[0].name;
        // console.log('here is', humansRouter.getService().getQueue()[0].ip);
        // console.log('reqclient is', reqClient);
        if (humansRouter.getService().getQueue().length > 0 &&
          reqIp === humansRouter.getService().getQueue()[0].ip) {
          isItYourTurn = true;
        }
        // console.log('reply to client', humansRouter.getService().getQueue());

        response.write(`data: ${JSON.stringify({
          humans: humansRouter.getService().getQueue().map(human => human.name),
          isItYourTurn: isItYourTurn,
          id: eventId,
          currentAdopter: currentAdopter,
          adoptedPet: adoptedPet
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
      dogsRouter.getService().deleteDog();
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