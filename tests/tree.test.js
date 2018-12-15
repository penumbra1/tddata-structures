import { createNode, createTree } from "../src/tree";

const mockNode = (key, children = []) => ({
  key,
  children,
  addChild: expect.any(Function)
});

describe("Node", () => {
  let n;

  beforeEach(() => {
    n = createNode(1);
  });

  test("createNode should create an empty node", () => {
    expect(n).toEqual(mockNode(1));
  });

  test("addChild should add a new child node", () => {
    const two = n.addChild(2);

    expect(n.children).toEqual([two]);
    expect(two).toEqual(mockNode(2));
  });
});

describe("Tree", () => {
  let t;

  beforeEach(() => {
    t = createTree(1);
  });

  test("createTree should throw if no key is specified", () => {
    const invalidCreate = () => createTree();

    expect(invalidCreate).toThrow();
  });

  test("createTree should create and return a tree with the specified root", () => {
    expect(t).toEqual({
      root: mockNode(1),
      print: expect.any(Function),
      traverse: expect.any(Function)
    });
  });

  test("print should return the correct string representation", () => {
    expect(t.print()).toBe("|--1\n");

    const two = t.root.addChild(2);
    const three = two.addChild(3);
    two.addChild(4);
    three.addChild(5);

    expect(t.print()).toMatchSnapshot();
  });
});
