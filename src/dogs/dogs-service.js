const Queue = require('../queues/queue-constructor');

let dogQueue = new Queue();


let dogs = [
  {
    imageURL: 'https://www.pawmygosh.com/wp-content/uploads/2016/06/dog-bubbles1.png',
    imageDescription: 'A golden retreiver chasing and trying to eat bubbles.',
    name: 'Zeus',
    sex: 'Male',
    age: 3,
    breed: 'Golden Retriever',
    story: 'Owner Passed away'
  },
  {
    imageURL: 'https://www.publicdomainpictures.net/pictures/280000/nahled/dog-alaskan-malamute-animal-pet.jpg',
    imageDescription: 'A black, tan, and white Malamute sitting.',
    name: 'Sparks',
    sex: 'Female',
    age: 1,
    breed: 'Malamute',
    story: 'Born at the shelter'
  },
  {
    imageURL: 'https://www.stockvault.net/data/2019/02/16/260193/preview16.jpg',
    imageDescription: 'A pug with crazy eyes.',
    name: 'Blue',
    sex: 'Male',
    age: 2,
    breed: 'Pug',
    story: 'Abandoned'
  },
  {
    imageURL: 'https://freestocks.org/fs/wp-content/uploads/2015/07/german_shepherd-1000x667.jpg',
    imageDescription: 'A german shepherd with snow on his muzzle looking into the distance.',
    name: 'Muggsy',
    sex: 'Male',
    age: 5,
    breed: 'German shepherd',
    story: 'Found in an alley'
  },
  {
    imageURL: 'https://static4.depositphotos.com/1004199/372/i/450/depositphotos_3724910-stock-photo-beagle-puppy.jpg',
    imageDescription: 'A beagle looking at the camera as if she\'s hoping for treats.',
    name: 'Taco',
    sex: 'Female',
    age: 2,
    breed: 'Beagle',
    story: 'Owners moved'
  }
]
dogs.map((dog) => {
  dogQueue.enqueue(dog);
});

const DogsService = {

  deleteDog() {
    let adoptedDog = dogQueue.dequeue();
    return adoptedDog;
  },
  getDogs() {
    return dogQueue.display();
  }
}

module.exports = DogsService;