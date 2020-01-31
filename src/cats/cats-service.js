const Queue = require('../queues/queue-constructor');

let catQueue = new Queue();


let cats = [
  {
    imageURL: 'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
    imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Juniper',
    sex: 'Male',
    age: 5,
    breed: 'Tabby',
    story: 'Owner developed allergies',
  },
  {
    imageURL: 'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
    imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Fluffy',
    sex: 'Female',
    age: 2,
    breed: 'Bengal',
    story: 'Thrown on the street',
  },
  {
    imageURL: 'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
    imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Pasta',
    sex: 'Female',
    age: 1,
    breed: 'Unknown',
    story: 'Need a story',
  },
  {
    imageURL: 'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
    imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Petey',
    sex: 'Male',
    age: 3,
    breed: 'Maine coon',
    story: 'Need a story',
  },
  {
    imageURL: 'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
    imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Doctor Cucumber',
    sex: 'Female',
    age: 3,
    breed: 'Ragdoll',
    story: 'Need a story',
  }
];
cats.map((cat) => {
  catQueue.enqueue(cat);
});
console.log('cats is h', catQueue);

const CatsService = {

  deleteCat() {
    let adoptedCat = catQueue.dequeue();
    catQueue.enqueue(adoptedCat);
    return catQueue.display(catQueue);

  },
  getCats() {
    return catQueue.display(catQueue);
  }
};

module.exports = CatsService;