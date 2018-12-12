import { createQueue, createPriorityQueue } from "./queue";

const basicQueueTests = () => {
  describe("create, enqueue, dequeue", () => {
    let q;

    beforeEach(() => {
      q = createQueue();
    });

    test("should create an empty queue ", () => {
      expect(q.length).toBe(0);
      expect(q.isEmpty).toBe(true);
    });

    test("should enqueue an element", () => {
      q.enqueue("Hi");

      expect(q.peek()).toBe("Hi");
    });

    test("should dequeue an element", () => {
      q.enqueue(1);
      q.enqueue(2);
      const removed = q.dequeue();

      expect(removed).toBe(1);
      expect(q.length).toBe(1);
      expect(q.peek()).toBe(2);
    });

    test("should leave an empty queue after dequeueing a single item", () => {
      q.enqueue(1);
      const removed = q.dequeue();

      expect(removed).toBe(1);
      expect(q.length).toBe(0);
      expect(q.isEmpty).toBe(true);
      expect(q.peek()).toBe(undefined);
    });

    test("dequeue should return undefined if the queue was empty", () => {
      expect(q.dequeue()).toBe(undefined);
    });
  });
};

describe("simple queue", () => {
  basicQueueTests();
});

describe("priority queue", () => {
  basicQueueTests();

  let pq;

  beforeEach(() => {
    pq = createPriorityQueue();
  });

  test("should enqueue according to priority", () => {
    pq.enqueue("Sleep");
    pq.enqueue("Coffee", true);
    pq.enqueue("Power");

    expect(pq.peek()).toBe("Coffee");

    pq.dequeue();

    expect(pq.peek()).toBe("Sleep");
  });

  test("should peek into the correct queue is one queue is empty", () => {
    pq.enqueue("Sleep");

    expect(pq.peek()).toBe("Sleep");
  });

  test("should dequeue according to priority", () => {
    pq.enqueue("Coffee", true);
    pq.enqueue("Power");
    pq.enqueue("Sleep");
    pq.dequeue();

    expect(pq.peek()).toBe("Power");

    pq.dequeue();

    expect(pq.peek()).toBe("Sleep");
  });

  test("should dequeue items with the same priority as FIFO", () => {
    pq.enqueue("Coffee", true);
    pq.enqueue("Music", true);
    pq.dequeue();

    expect(pq.peek()).toBe("Music");
  });

  test("should report correct total length", () => {
    pq.enqueue("Music", true);
    pq.enqueue("Sleep");

    expect(pq.length).toBe(2);

    pq.dequeue();
    expect(pq.length).toBe(1);

    pq.dequeue();
    expect(pq.length).toBe(0);
    expect(pq.isEmpty).toBe(true);
  });
});
