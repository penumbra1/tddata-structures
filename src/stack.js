export default function createStack(max = 5) {
  const stack = [];

  return {
    max,
    push(item) {
      if (stack.length < max) stack.push(item);
      else throw new Error("Stack overflow!");
    },
    pop() {
      return stack.pop();
    },
    peek() {
      return stack[stack.length - 1];
    },
    get isEmpty() {
      return stack.length === 0;
    },
    get length() {
      return stack.length;
    }
  };
}
