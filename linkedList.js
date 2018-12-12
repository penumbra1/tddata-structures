export function createNode(value) {
  return {
    value,
    next: null
  };
}

// Singly linked list
export function createLinkedList() {
  return {
    head: null,
    tail: null,
    length: 0,
    push(value) {
      const node = createNode(value);

      if (this.length === 0) {
        this.head = node;
      } else {
        this.tail.next = node;
      }

      this.tail = node;
      this.length++;
    },
    pop() {
      if (this.length === 0) {
        return undefined;
      }

      const oldTail = this.tail;
      // newTail will refer to the node previous to oldTail
      let newTail = this.head;

      if (this.length === 1) {
        this.head = null;
        newTail = null;
      } else {
        while (newTail.next !== this.tail) {
          newTail = newTail.next;
        }

        newTail.next = null;
      }

      this.tail = newTail;
      this.length--;

      return oldTail;
    },
    shift(value) {
      const node = createNode(value);

      node.next = this.head;
      this.head = node;
      if (this.length === 0) {
        this.tail = node;
      }
      this.length++;
    },
    unshift() {
      if (this.length === 0) {
        return undefined;
      }

      if (this.length === 1) {
        this.tail = null;
      }

      const oldHead = this.head;
      this.head = this.head.next;
      this.length--;

      return oldHead;
    },
    insertAfter(prevValue, value) {
      const node = createNode(value);

      let current = this.head;

      while (current !== null && current.value !== prevValue) {
        current = current.next;
      }

      if (current === null) {
        throw new Error("Previous node not found");
      }

      if (current === this.tail) {
        this.tail = node;
      }

      node.next = current.next;
      current.next = node;
      this.length++;
    },
    get isEmpty() {
      return this.length === 0;
    }
  };
}
