import humans from '../stores/humans.js';
const Queue = require('./queue-constructor.js');



function initializePets() {
  let petQueue = new Queue();
  petQueue.enqueue();
  petQueue.enqueue();
  petQueue.enqueue();
}

function removePet() {
  petQueue.dequeue();
  petQueue.enqueue(/*pet store info*/)
}

function initializeHumans() {
  let humanQueue = new Queue();
  humanQueue.enqueue(humans[0].name);

}

function continueHumans() {
  let index = Math.floor(math.random() * humans.length);
  humanQueue.enqueue(humans[index].name);
}