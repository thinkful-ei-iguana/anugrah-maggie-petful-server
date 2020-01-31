const Queue = require('../queues/queue-constructor');

let catQueue = new Queue();


let cats = [
  {
    imageURL: 'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
    imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Fluffy',
    sex: 'Female',
    age: 2,
    breed: 'Bengal',
    story: 'Thrown on the street',
  }
]
cats.map((cat) => {
  catQueue.enqueue(cat);
})

const CatsService = {

  deleteCat() {
    let adoptedCat = catQueue.dequeue();
    catQueue.enqueue(adoptedCat);
    return catQueue.display(catQueue);

  },
  getCats() {
    return catQueue.display(catQueue);
  }
}

module.exports = CatsService;