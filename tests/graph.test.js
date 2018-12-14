import { createNode, createGraph } from "../src/graph";

// Stub out addNeighbor to compare objects with methods via .toEqual
const mockNode = value => ({
  ...createNode(value),
  addNeighbor: expect.any(Function),
  print: expect.any(Function)
});

describe("Node", () => {
  let n;

  beforeEach(() => {
    n = createNode(1);
  });

  test("createNode should return a new node", () => {
    expect(n).toEqual(mockNode(1));
  });

  test("addNeighbor should add a node to the array of neighbors", () => {
    const neighbor = createNode(2);

    n.addNeighbor(neighbor);

    expect(n.neighbors).toEqual([neighbor]);
  });

  test("print should return the correct string representation", () => {
    expect(n.print()).toBe("1");

    n.addNeighbor(createNode(1));
    expect(n.print()).toBe("1 => 1");

    n.addNeighbor(createNode(2));
    expect(n.print()).toBe("1 => 1 2");
  });
});

describe("Graph", () => {
  let g;

  beforeEach(() => {
    g = createGraph();
  });

  test("createGraph should create an empty undirected or directed graph", () => {
    expect(g.directed).toBe(false);
    expect(g.nodes).toEqual([]);
    expect(g.edges).toEqual([]);

    g = createGraph(true);

    expect(g.directed).toBe(true);
    expect(g.nodes).toEqual([]);
    expect(g.edges).toEqual([]);
  });

  test("addNode should do nothing and return null if the key is invalid", () => {
    const invalidOne = g.addNode();
    const invalidTwo = g.addNode(null);

    expect(invalidOne).toBe(null);
    expect(invalidTwo).toBe(null);
    expect(g.nodes).toEqual([]);
    expect(g.edges).toEqual([]);
  });

  test("addNode should add a node to the graph if the key is valid", () => {
    const one = g.addNode(1);

    expect(one).toEqual(mockNode(1));
    expect(g.nodes).toEqual([one]);
    expect(g.edges).toEqual([]);
  });

  test("addNode should do nothing and return null if the key is repeated", () => {
    const [one, anotherOne] = [g.addNode(1), g.addNode(1)];

    expect(anotherOne).toBe(null);
    expect(g.nodes).toEqual([one]);
    expect(g.edges).toEqual([]);
  });

  test("getNode should return null if the key is not found", () => {
    expect(g.getNode()).toBe(null);
    expect(g.getNode(1)).toBe(null);

    g.addNode(1);
    expect(g.getNode(2)).toBe(null);
  });

  test("getNode should return the correct node", () => {
    g.addNode(1);
    const two = g.addNode(2);

    expect(g.getNode(2)).toBe(two);
  });

  test("addEdge should do nothing and throw if either node was not found", () => {
    g.addNode(1);
    const addEdgeOne = () => g.addEdge(1);
    const addEdgeTwo = () => g.addEdge(2, 3);

    expect(addEdgeOne).toThrow("Node not found (key: undefined)");
    expect(addEdgeTwo).toThrow("Node not found (key: 2)");
    expect(g.edges).toEqual([]);
    expect(g.getNode(1).neighbors).toEqual([]);
  });

  test("addEdge should add edge and neighbors correctly", () => {
    let [one, two] = [g.addNode(1), g.addNode(2)];

    let edge = g.addEdge(1, 2);

    expect(edge).toBe("1-2");
    expect(one.neighbors).toEqual([two]);
    expect(two.neighbors).toEqual([one]);

    g = createGraph(true);
    [one, two] = [g.addNode(1), g.addNode(2)];
    edge = g.addEdge(2, 1);

    expect(edge).toBe("2-1");
    expect(two.neighbors).toEqual([one]);
  });

  test("print should return the correct string representation", () => {
    expect(g.print()).toBe("");

    g.addNode(1);
    expect(g.print()).toBe("1");

    g.addNode(2);
    g.addNode(3);
    g.addEdge(3, 1);
    expect(g.print()).toMatchSnapshot();

    g = createGraph(true);
    g.addNode(1);
    g.addNode(2);
    g.addEdge(1, 2);

    expect(g.print()).toMatchSnapshot();
  });

  test("traverseBreadth should perform a breadth-first traversal", () => {
    g.addNode(1);
    g.addNode(2);
    g.addNode(3);
    g.addNode(4);
    g.addEdge(1, 2);
    g.addEdge(1, 3); // 1 => 2 3
    g.addEdge(2, 4); // 2 => 4
    const visited = [];

    g.traverseBreadth(1, node => visited.push(node.key));

    expect(visited.join("")).toMatch(/^1(23|32)4$/);
  });

  test("traverseBreadth should throw an error is startingKey is not found", () => {
    const visited = [];
    const traversal = () =>
      g.traverseBreadth(1, node => visited.push(node.key));

    expect(traversal).toThrow();
    expect(visited).toEqual([]);

    g.addNode(2);

    expect(traversal).toThrow();
    expect(visited).toEqual([]);
  });

  test("traverseDepth should perform a depth-first traversal", () => {
    g.addNode(1);
    g.addNode(2);
    g.addNode(3);
    g.addNode(4);
    g.addEdge(1, 2);
    g.addEdge(1, 3); // 1 => 2 3
    g.addEdge(2, 4); // 2 => 4
    const visited = [];

    g.traverseDepth(1, node => visited.push(node.key));

    expect(visited.join("")).toMatch(/^1(24|42)3$/);
  });

  test("traverseDepth should throw an error is startingKey is not found", () => {
    const visited = [];
    const traversal = () => g.traverseDepth(1, node => visited.push(node.key));

    expect(traversal).toThrow();
    expect(visited).toEqual([]);

    g.addNode(2);

    expect(traversal).toThrow();
    expect(visited).toEqual([]);
  });
});
