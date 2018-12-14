import { createNode, createGraph } from "../src/graph";

describe("node", () => {
  test("createNode should return a new node", () => {
    const node = createNode(1);

    expect(node).toEqual({
      key: 1,
      neighbors: [],
      addNeighbor: expect.any(Function)
    });
  });

  test("addNeighbor should add a node to the array of neighbors", () => {
    const [node, neighbor] = [createNode(1), createNode(2)];

    node.addNeighbor(neighbor);

    expect(node.neighbors).toEqual([neighbor]);
  });
});

// Stub out addNeighbor to compare objects with methods via .toEqual
const mockNode = value => ({
  ...createNode(value),
  addNeighbor: expect.any(Function)
});

describe("graph", () => {
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

  test("addEdge should do nothing and return null is any node is not specified or found", () => {
    g.addNode(1);
    const edgeOne = g.addEdge(g.getNode(2));
    const edgeTwo = g.addEdge(g.getNode(2), g.getNode(3));

    expect(edgeOne).toBe(null);
    expect(edgeTwo).toBe(null);
    expect(g.edges).toEqual([]);
    expect(g.getNode(1).neighbors).toEqual([]);
  });

  test("addEdge should set edge and neighbors correctly", () => {
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
});
