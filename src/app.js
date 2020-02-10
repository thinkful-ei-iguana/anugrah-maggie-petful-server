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
      isItYourTurn: false,
      currentCat: catsRouter.getService().getCats()[0],
      currentDog: dogsRouter.getService().getDogs()[0]
    })}\n\n`);
    res.flush();
    listOfClients.set(ip, {
      res: res,
      req: req
    });
  }

});

app.use('/api/cats', catsRouter.getRouter());
app.use('/api/dogs', dogsRouter.getRouter());
app.use('/api/humans', humansRouter.getRouter());

function adoptionLoopTick() {

  let promiseLoop = new Promise((resolve) => {

    let replyToClients = (adoptedPet) => {
      console.log("reply to clients", listOfClients.size);
      let currentHuman = humansRouter.getService().deleteHuman();

      // if there's no adopted pet and it's a dummy user, assign a random pet
      if (!adoptedPet && !currentHuman.ip) {
        if (Math.random() < .5) {
          adoptedPet = dogsRouter.getService().deleteDog();
        }
        else {
          adoptedPet = catsRouter.getService().deleteCat();
        }
      }
      eventId++;

      console.log(dogsRouter.getService().getDogs()[0].name);
      for (let element of listOfClients.entries()) {
        let reqIp = element[0];
        let resAndReq = element[1];
        let response = resAndReq.res;
        let isItYourTurn = false;

        console.log('math random is', adoptedPet);
        if (humansRouter.getService().getQueue().length > 0 &&
          reqIp === humansRouter.getService().getQueue()[0].ip) {
          isItYourTurn = true;
        }
        //     // THE CODE BELOW NEEDS:
        //     // * 'data: ' to precede ANYTHING ELSE
        //     // * '\n\n' needs to succeed EVERYTHING
        let responseObj = {
          humans: humansRouter.getService().getQueue().map(human => human.name),
          isItYourTurn: isItYourTurn,
          id: eventId,
          currentAdopter: currentHuman.name,
          adoptedPet: adoptedPet,
          currentCat: catsRouter.getService().getCats()[0],
          currentDog: dogsRouter.getService().getDogs()[0]
        };
        response.write(`data: ${JSON.stringify(responseObj)}\n\n`);
        response.flush();
      }

      resolve();
    };

    // wait for person to make a pet selection
    let adoptionTimeout = setTimeout(() => {
      console.log('*** LOOP TICK: adoption timeout');
      // if person runs out of time
      // force person to end of the queue
      replyToClients(null);
    }, 5000);

    let adoptedPet = (adoptedPet) => {
      clearTimeout(adoptionTimeout);
      replyToClients(adoptedPet);
    };

    // dequeue pet, dequeue human
    // re-enqueue pet, re-enqueue human
    catsRouter.listenForAdoption(() => {
      console.log('*** LOOP TICK: user adopted cat');
      let adoptedCat = catsRouter.getService().deleteCat();
      adoptedPet(adoptedCat);
      return adoptedCat;
    });

    dogsRouter.listenForAdoption(() => {
      console.log('*** LOOP TICK: user adopted dog');
      let adoptedDog = dogsRouter.getService().deleteDog();
      adoptedPet(adoptedDog);
      return adoptedDog;
    });
  })
    .then(() => {
      adoptionLoopTick();
    });

  return promiseLoop;
}
adoptionLoopTick();

module.exports = app;