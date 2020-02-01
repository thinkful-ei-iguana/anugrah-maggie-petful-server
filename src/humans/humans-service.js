const Queue = require('../queues/queue-constructor');


class HumansService {
  constructor() {
    this.humanQueue = new Queue();

    let humans = [
      {
        name: 'Tauhida'
      },
      {
        name: 'Maggie'
      },
      {
        name: 'Anugrah'
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
    return this.humanQueue.display();
  }

  deleteHuman() {
    let currentAdopter = this.humanQueue.dequeue();
    this.humanQueue.enqueue(currentAdopter);
    return this.humanQueue.display();
  }

  getQueue() {
    return this.humanQueue.display();
  }
}

module.exports = HumansService;