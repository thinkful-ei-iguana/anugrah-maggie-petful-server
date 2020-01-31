import humans from '../stores/humans.js';
const Queue = require('./queue-constructor.js');


let petQueue = new Queue();
let humanQueue = new Queue();

function initializePets() {
  petQueue.enqueue();
  petQueue.enqueue();
  petQueue.enqueue();
}

function removePet() {
  petQueue.dequeue();
  petQueue.enqueue(/*pet store info*/);
}

function initializeHumans() {
  humanQueue.enqueue(humans[0].name);
}

function continueHumans() {
  let index = Math.floor(Math.random() * humans.length);
  humanQueue.enqueue(humans[index].name);
}

function queueCount(queue) {
  if (!queue.first) {
    return console.log('nothing in the queue');
  }

  let count = 0;
  let currNode = queue.first;
  while (currNode) {
    count++;
    currNode = currNode.next;
  }
  return count;
}

function whereInLine(person, queue) {
  let placement = 0;
  let currNode = queue.first;
  while (currNode.value !== person) {
    placement++;
    currNode = currNode.next;
  }
  return placement;
}