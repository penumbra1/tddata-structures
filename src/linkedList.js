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
    get isEmpty() {
      return this.length === 0;
    },
    get(index) {
      if (index < 0 || index > this.length - 1) return null;

      if (index === 0) return this.head;
      if (index === this.length - 1) return this.tail;

      let current = this.head;

      let i = 0;
      while (i !== index) {
        current = current.next;
        i++;
      }

      return current;
    },
    delete(index) {
      if (index < 0 || index > this.length - 1) return null;

      let currentIndex = 0;
      let [previous, current, following] = [null, this.head, this.head.next];

      while (currentIndex < index) {
        [previous, current, following] = [current, following, following.next];
        currentIndex++;
      }

      if (previous === null) {
        // Current head will be removed
        this.head = following;
      } else {
        previous.next = following;
      }

      if (following === null) {
        // Current tail will be removed
        this.tail = previous;
      }

      this.length--;

      return current;
    },
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
        return null;
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
        return null;
      }

      if (this.length === 1) {
        this.tail = null;
      }

      const oldHead = this.head;
      this.head = this.head.next;
      this.length--;

      return oldHead;
    },
    insertAt(index, value) {
      const node = createNode(value);

      if (index < 0 || index > this.length) return null;

      let currentIndex = 0;
      let [insertAfter, insertBefore] = [null, this.head];

      if (index === this.length) {
        // No need to traverse the list - fast forward to the end:
        currentIndex = this.length;
        [insertAfter, insertBefore] = [this.tail, null];
        this.tail = node;
      }

      while (currentIndex < index) {
        [insertAfter, insertBefore] = [insertBefore, insertBefore.next];
        currentIndex++;
      }

      if (insertAfter === null) {
        this.head = node;
      } else {
        insertAfter.next = node;
      }

      node.next = insertBefore;

      this.length++;

      return node;
    },
    find(value) {
      let current = this.head;
      let index = 0;

      while (current && current.value !== value) {
        current = current.next;
        index++;
      }

      if (current === null) return null;

      return index;
    },
    print() {
      let current = this.head;
      const values = [];

      while (current) {
        values.push(current.value);
        current = current.next;
      }

      return values.join(" => ");
    }
  };
}
