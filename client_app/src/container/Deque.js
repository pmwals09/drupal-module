// eslint-disable-next-line max-classes-per-file
class Node {
  constructor(val = null) {
    this._value = val;
    this._next = null;
    this._prev = null;
  }

  get value() {
    return this._value;
  }

  get next() {
    return this._next;
  }

  set next(n) {
    this._next = n;
  }

  get prev() {
    return this._prev;
  }

  set prev(n) {
    this._prev = n;
  }
}

export class Deque {
  constructor() {
    this.front = null;
    this.back = null;
    this.length = 0;
  }

  addFront(item) {
    const n = new Node(item);
    if (this.length === 0) {
      this.front = n;
      this.back = n;
      this.length = 1;
    } else {
      n.next = this.front;
      this.front.prev = n;
      this.front = n;
      this.length += 1;
    }
  }

  removeFront() {
    if (this.length) {
      const item = this.front;
      if (this.length === 1) {
        this.front = null;
        this.back = null;
      } else {
        this.front = item.next;
        this.front.prev = null;
      }
      this.length -= 1;
      return item.value;
    }
    return null;
  }

  peekFront() {
    if (this.front) {
      return this.front.value;
    }
    return null;
  }

  addBack(item) {
    const n = new Node(item);
    if (this.length === 0) {
      this.front = n;
      this.back = n;
      this.length = 1;
    } else {
      this.back.next = n;
      n.prev = this.back;
      this.back = n;
      this.length += 1;
    }
  }

  removeBack() {
    if (this.length) {
      const item = this.back;
      if (this.length === 1) {
        this.front = null;
        this.back = null;
      } else {
        this.back = item.prev;
        this.back.next = null;
      }
      this.length -= 1;
      return item.value;
    }
    return null;
  }

  peekBack() {
    if (this.back) {
      return this.back.value;
    }
    return null;
  }

  empty() {
    this.front = null;
    this.back = null;
    this.length = 0;
  }

  toString() {
    const vals = [];
    let curr = this.front;
    while (![null, undefined].includes(curr)) {
      vals.push(curr.value.toString());
      curr = curr.next;
    }

    return vals.join(" <--> ");
  }

  clone() {
    const newDq = new Deque();
    let curr = this.front;
    while (curr !== null) {
      newDq.addBack(curr);
      curr = curr.next;
    }

    return newDq;
  }
}
