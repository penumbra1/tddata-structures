export function createQueue() {
  const queue = [];

  return {
    enqueue(item) {
      queue.unshift(item);
    },
    dequeue() {
      return queue.pop();
    },
    peek() {
      return queue[queue.length - 1];
    },
    get length() {
      return queue.length;
    },
    get isEmpty() {
      return queue.length === 0;
    }
  };
}

export function createPriorityQueue() {
  const lowPriority = createQueue();
  const highPriority = createQueue();
  return {
    enqueue(item, isHighPriority = false) {
      if (isHighPriority) highPriority.enqueue(item);
      else lowPriority.enqueue(item);
    },
    dequeue() {
      if (!highPriority.isEmpty) return highPriority.dequeue();
      return lowPriority.dequeue();
    },
    peek() {
      if (!highPriority.isEmpty) return highPriority.peek();
      return lowPriority.peek();
    },
    get length() {
      return highPriority.length + lowPriority.length;
    },
    get isEmpty() {
      return highPriority.isEmpty && lowPriority.isEmpty;
    }
  };
}
