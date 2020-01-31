const Queue = require('../queues/queue-constructor');

let dogQueue = new Queue();


let dogs = [
  {
    imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
    imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
    name: 'Zeus',
    sex: 'Male',
    age: 3,
    breed: 'Golden Retriever',
    story: 'Owner Passed away'
  }
]
dogs.map((dog) => {
  dogQueue.enqueue(dog);
});

const DogsService = {

  deleteDog() {
    let adoptedDog = dogQueue.dequeue();
    dogQueue.enqueue(adoptedDog);
    return dogQueue.display(dogQueue);

  },
  getDogs() {
    return dogQueue.display(dogQueue);
  }
}

module.exports = DogsService;