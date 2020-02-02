const Queue = require('../queues/queue-constructor');


class HumansService {
  constructor() {
    this.humanQueue = new Queue();

    let humans = [
      {
        name: 'Tauhida',
        ip: null
      },
      {
        name: 'Maggie',
        ip: null
      },
      {
        name: 'Anugrah',
        ip: null
      }

    ];


    humans.map((human) => {
      this.humanQueue.enqueue(human);
    });
  }

  getHumans() {
    return this.humanQueue.display();
  }

  postHuman(newHuman) {
    this.humanQueue.enqueue(newHuman);
    return this.humanQueue.display().map(human => {
      return human.name;
    });
  }

  deleteHuman() {
    let currentAdopter = this.humanQueue.dequeue();
    return currentAdopter;
  }

  getQueue() {
    return this.humanQueue.display();
  }
}

module.exports = HumansService;