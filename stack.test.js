import createStack from "./stack";

let s;

beforeEach(() => {
  s = createStack();
});

test("should create an empty stack with default max value", () => {
  expect(s.length).toBe(0);
  expect(s.max).toBe(5);
  expect(s.isEmpty).toBe(true);
});

test("should push items onto the stack in LIFO order", () => {
  s.push(1);
  s.push(2);
  expect(s.peek()).toBe(2);
});

test("should pop the last-in item from the stack", () => {
  s.push(1);
  s.push(2);
  s.pop();
  expect(s.length).toBe(1);
  expect(s.peek()).toBe(1);
});

test("should throw on stack overflow", () => {
  for (let i = 0; i < 5; i++) {
    s.push(i);
  }
  expect(() => s.push(5)).toThrow();
});
