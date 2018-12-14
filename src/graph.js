import { createQueue } from "./queue";

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
    getNode(key) {
      return nodes.find(node => node.key === key) || null;
    },
    addNode(key) {
      if (key == null || this.getNode(key) != null) return null;

      const newNode = createNode(key);
      nodes.push(newNode);

      return newNode;
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
    },
    traverseBreadth(startingKey, action) {
      const startingNode = this.getNode(startingKey);
      const visited = {};
      let currentNode;
      const queue = createQueue();
      if (startingNode) queue.enqueue(startingNode);
      else throw new Error(`Starting node not found`);

      while (!queue.isEmpty) {
        currentNode = queue.dequeue();
        currentNode.neighbors.forEach(node => {
          if (!visited[node.key]) queue.enqueue(node);
        });
        action(currentNode);
        visited[currentNode.key] = true;
      }
    },
    traverseDepth(startingKey, action) {
      const startingNode = this.getNode(startingKey);
      const visited = {};

      function explore(node) {
        if (visited[node.key]) return;

        action(node);
        visited[node.key] = true;
        node.neighbors.forEach(neighbor => explore(neighbor));
      }

      if (startingNode) explore(startingNode);
      else throw new Error(`Starting node not found`);
    }
  };
}
