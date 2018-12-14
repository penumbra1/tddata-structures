export function createNode(key) {
  const neighbors = [];

  return {
    key,
    neighbors,
    addNeighbor(node) {
      neighbors.push(node);
    },
    print() {
      const neighborList = neighbors.map(n => n.key).join(" ");
      const line = `${this.key}${neighborList && ` => ${neighborList}`}`;

      return line;
    }
  };
}

export function createGraph(directed = false) {
  const nodes = [];
  const edges = [];

  return {
    directed,
    nodes,
    edges,
    addNode(key) {
      if (key == null) return null;

      const newNode = createNode(key);
      nodes.push(newNode);

      return newNode;
    },
    getNode(key) {
      return nodes.find(node => node.key === key) || null;
    },
    addEdge(node1Key, node2Key) {
      const [node1, node2] = [this.getNode(node1Key), this.getNode(node2Key)];

      if (!node1 || !node2) return null;

      node1.addNeighbor(node2);
      if (!this.directed) node2.addNeighbor(node1);

      const newEdge = `${node1Key}-${node2Key}`;

      edges.push(newEdge);

      return newEdge;
    },
    print() {
      return nodes.map(node => node.print()).join("\n");
    }
  };
}
