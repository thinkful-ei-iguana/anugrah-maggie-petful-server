const Queue = require('../queues/queue-constructor');

let humanQueue = new Queue();

let humans = [
  {
    name: 'John'
  },
  {
    name: 'Tauhida'
  },
  {
    name: 'Maggie'
  },
  {
    name: 'Anugrah'
  },
  {
    name: 'Nicki'
  },
  {
    name: 'Megan'
  }
];


humans.map((human) => {
  humanQueue.enqueue(human);
})

const HumansService = {

  getHumans() {
    return humanQueue.display(humanQueue)
  },
  postHuman() {

  },
  deleteHuman() {
    humanQueue.dequeue();
    return humanQueue.display(humanQueue);
  }
}

module.exports = HumansService;