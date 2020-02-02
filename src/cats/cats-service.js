const Queue = require('../queues/queue-constructor');

let catQueue = new Queue();


let cats = [
  {
    imageURL: 'https://cdn.theatlantic.com/static/mt/assets/science/cat_caviar.jpg',
    imageDescription: 'Swanky confident orange cat in formalwear.',
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
    imageURL: 'https://www.publicdomainpictures.net/pictures/200000/velka/savannah-cat-portrait.jpg',
    imageDescription: 'Spotted savannah cat sitting.',
    name: 'Pasta',
    sex: 'Female',
    age: 1,
    breed: 'Savannah cat',
    story: 'Born at the shelter',
  },
  {
    imageURL: 'https://www.publicdomainpictures.net/pictures/160000/nahled/maine-coon-cat.jpg',
    imageDescription: 'Maine coon cat sitting outside.',
    name: 'Petey',
    sex: 'Male',
    age: 3,
    breed: 'Maine coon',
    story: 'Abandoned',
  },
  {
    imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiCzlHLJKr26CEObJqwo8Tv4uWIurtQV7ox_CJytmjr35zvmQS2g&s',
    imageDescription: 'White cat stepping through photo frame.',
    name: 'Doctor Cucumber',
    sex: 'Female',
    age: 3,
    breed: 'Ragdoll',
    story: 'Born at the shelter',
  }
];
cats.map((cat) => {
  catQueue.enqueue(cat);
});
// console.log('cats is h', catQueue);

const CatsService = {

  deleteCat() {
    let adoptedCat = catQueue.dequeue();
    return adoptedCat;
  },
  getCats() {
    return catQueue.display(catQueue);
  },
  // postCat() {

  // },
};

module.exports = CatsService;