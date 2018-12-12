import { createNode, createLinkedList } from "./linkedList";

describe("node", () => {
  test("node factory should create a node", () => {
    const n = createNode(1);

    expect(n).toEqual({ value: 1, next: null });
  });
});

describe("linkedist", () => {
  let l;

  beforeEach(() => {
    l = createLinkedList();
  });

  test("linkedist factory should create an empty list", () => {
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

  test("insertAfter should insert a node correctly", () => {
    const four = createNode(4);

    l.push(1);
    l.push(3);
    l.insertAfter(1, 2);
    l.insertAfter(3, 4);

    expect(l.length).toBe(4);
    expect(l.head.next).toEqual({ value: 2, next: { value: 3, next: four } });
    expect(l.tail).toEqual(four);
  });

  test("insertAfter should throw if prevValue doesn't exist", () => {
    expect(() => l.insertAfter(1, 4)).toThrow();

    l.push(1);
    l.push(2);

    expect(() => l.insertAfter(3, 4)).toThrow();
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
    l.push(2); // if values are repeated, it should get the first one
    l.push(2);

    expect(l.find(1)).toBe(0);
    expect(l.find(2)).toBe(1);
  });
});
