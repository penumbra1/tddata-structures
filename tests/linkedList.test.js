import { createNode, createLinkedList } from "../src/linkedList";

describe("Node", () => {
  test("node factory should create a node", () => {
    const n = createNode(1);

    expect(n).toEqual({ value: 1, next: null });
  });
});

describe("LinkedList", () => {
  let l;

  beforeEach(() => {
    l = createLinkedList();
  });

  test("linkedList factory should create an empty list", () => {
    expect(l.head).toBe(null);
    expect(l.tail).toBe(null);
    expect(l.length).toBe(0);
    expect(l.isEmpty).toBe(true);
  });

  test("push should add a new tail (and head if the list was empty)", () => {
    const [one, two] = [createNode(1), createNode(2)];

    l.push(1);

    expect(l.length).toBe(1);
    expect(l.head).toEqual(one);
    expect(l.tail).toEqual(one);

    l.push(2);

    expect(l.length).toBe(2);
    expect(l.head).toEqual({ value: 1, next: two });
    expect(l.tail).toEqual(two);
  });

  test("pop should remove and reset the tail", () => {
    const [two, three] = [createNode(2), createNode(3)];

    l.push(1);
    l.push(2);
    l.push(3);
    const removed = l.pop();

    expect(removed).toEqual(three);
    expect(l.tail).toEqual(two);
    expect(l.head).toEqual({ value: 1, next: two });
    expect(l.length).toBe(2);
  });

  test("if pop leaves a single node, it should be both head and tail", () => {
    const one = createNode(1);

    l.push(1);
    l.push(2);
    l.pop();

    expect(l.tail).toEqual(one);
    expect(l.head).toEqual(one);
    expect(l.length).toBe(1);
  });

  test("pop should return null if the list is empty", () => {
    expect(l.pop()).toBe(null);
  });

  test("pop should result in an empty list if length was 1", () => {
    l.push(1);
    l.pop();

    expect(l.head).toBe(null);
    expect(l.tail).toBe(null);
    expect(l.length).toBe(0);
    expect(l.isEmpty).toBe(true);
  });

  test("insertAt should insert a node into an empty list", () => {
    const one = createNode(1);

    const node = l.insertAt(0, 1);

    expect(node).toEqual(one);
    expect(l.head).toEqual(one);
    expect(l.tail).toEqual(one);
    expect(l.length).toBe(1);
  });

  test("insertAt should insert a node into a non-empty list", () => {
    l.insertAt(0, 1);
    const tailNode = l.insertAt(1, 3);

    expect(tailNode).toEqual(createNode(3));
    expect(l.head).toEqual({ value: 1, next: tailNode });
    expect(l.tail).toEqual(tailNode);
    expect(l.length).toBe(2);

    const middleNode = l.insertAt(1, 2);

    expect(middleNode).toEqual({ value: 2, next: tailNode });
    expect(l.head).toEqual({ value: 1, next: middleNode });
    expect(l.tail).toEqual(tailNode);
    expect(l.length).toBe(3);
  });

  test("insertAt should do nothing and return null if index is out of range", () => {
    expect(l.insertAt(-1, 1)).toBe(null);
    expect(l.insertAt(1, 1)).toBe(null);
    expect(l.length).toBe(0);

    l.push(1);
    l.push(1);

    expect(l.insertAt(3, 1)).toBe(null);
    expect(l.length).toBe(2);
  });

  test("shift should insert a new head (and tail if the list was empty)", () => {
    const one = createNode(1);

    l.shift(1);

    expect(l.head).toEqual(one);
    expect(l.tail).toEqual(one);
    expect(l.length).toBe(1);

    l.shift(2);

    expect(l.head).toEqual({ value: 2, next: one });
    expect(l.tail).toEqual(one);
    expect(l.length).toBe(2);
  });

  test("unshift should remove and reset the head", () => {
    const one = createNode(1);

    l.shift(1);
    l.shift(2);
    l.shift(3);
    const removed = l.unshift();
    const two = { value: 2, next: one };

    expect(removed).toEqual({ value: 3, next: two });
    expect(l.head).toEqual(two);
    expect(l.tail).toEqual(one);
    expect(l.length).toBe(2);
  });

  test("if unshift leaves a single node, it should be both head and tail", () => {
    const one = createNode(1);

    l.shift(1);
    l.shift(2);
    l.unshift();

    expect(l.tail).toEqual(one);
    expect(l.head).toEqual(one);
    expect(l.length).toBe(1);
  });

  test("unshift should result in an empty list if length was 1", () => {
    l.shift(1);
    const removed = l.unshift();

    expect(removed).toEqual({ value: 1, next: null });
    expect(l.head).toBe(null);
    expect(l.tail).toBe(null);
    expect(l.length).toBe(0);
    expect(l.isEmpty).toBe(true);
  });

  test("unshift should return null if the list was empty", () => {
    expect(l.unshift()).toBe(null);
  });

  test("find should return null if list is empty", () => {
    expect(l.find(1)).toBe(null);
  });

  test("find should return the correct index", () => {
    l.push(1);

    expect(l.find(1)).toBe(0);

    l.push(2);
    l.push(3);

    expect(l.find(2)).toBe(1);
    expect(l.find(3)).toBe(2);
  });

  test("find should return the index of the first occurrence", () => {
    l.push(1);
    l.push(2);
    l.push(2);

    expect(l.find(2)).toBe(1);
  });

  test("get should return null if index is out of range", () => {
    expect(l.get(0)).toBe(null);
    expect(l.get(-1)).toBe(null);

    l.unshift(1);
    expect(l.get(2)).toBe(null);
  });

  test("get should return the correct node", () => {
    const [one, three] = [createNode(1), createNode(3)];

    l.push(1);

    expect(l.get(0)).toEqual(one);

    l.push(2);
    l.push(3);

    expect(l.get(1)).toEqual({ value: 2, next: three });
    expect(l.get(2)).toEqual(three);
  });

  test("delete should do nothing and return null if index is out of range", () => {
    expect(l.delete(-1)).toBe(null);
    expect(l.delete(0)).toBe(null);
    expect(l.length).toBe(0);

    l.push(1);

    expect(l.delete(1)).toBe(null);
    expect(l.length).toBe(1);
  });

  test("delete should return the deleted node", () => {
    l.push(1);
    const deleted = l.delete(0);

    expect(deleted).toEqual(createNode(1));
  });

  test("delete should result in an empty list if length was 1", () => {
    l.push(1);

    l.delete(0);

    expect(l.head).toBe(null);
    expect(l.tail).toBe(null);
    expect(l.length).toBe(0);
    expect(l.isEmpty).toBe(true);
  });

  test("delete should remove and reset head or tail", () => {
    const [one, two] = [createNode(1), createNode(2)];
    const [headIndex, tailIndex] = [0, 1];

    l.push(1);
    l.push(2); // [1, 2]
    l.delete(tailIndex);

    expect(l.head).toEqual(one);
    expect(l.tail).toEqual(one);
    expect(l.length).toBe(1);

    l.push(1);
    l.push(2); // [1, 1, 2]
    l.delete(headIndex);

    expect(l.head).toEqual({ value: 1, next: two });
    expect(l.tail).toEqual(two);
    expect(l.length).toBe(2);
  });

  test("print should return the correct string representation", () => {
    expect(l.print()).toBe("");

    l.push(1);

    expect(l.print()).toBe("1");

    l.push(2);
    l.push(3);
    l.push(4);

    expect(l.print()).toMatchSnapshot();
  });
});
