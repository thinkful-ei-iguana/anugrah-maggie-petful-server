const _Node = require('./node-constructor.js');

class Queue {
  constructor() {
    this.value = null;
    this.next = null;
  }
  enqueue(data) {
    const node = new _Node(data);
    if (this.first === null) {
      this.first = node;
    }

    if (this.last) {
      this.last.next = node;
    }
    this.last = node;
  }
  dequeue() {
    if (this.first === null) {
      return;
    }

    const node = this.first;
    this.first = this.first.next;

    if (node === this.last) {
      this.last = null;
    }

    return node.value;
  }

  display() {
    let currNode = this.first;
    while (currNode !== null) {
      console.log(currNode.value);
      currNode = currNode.next;
    }
  }
}
module.exports = Queue;