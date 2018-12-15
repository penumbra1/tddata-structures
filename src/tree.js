export function createNode(key) {
  const children = [];

  return {
    key,
    children,
    addChild(childKey) {
      const child = createNode(childKey);
      children.push(child);
      return child;
    }
  };
}

export function createTree(rootKey) {
  if (rootKey == null) throw new Error("Creating a tree requires a root key");

  const root = createNode(rootKey);

  return {
    root,
    traverse(node, action, depth) {
      action(node, depth);

      if (node.children.length) {
        node.children.forEach(child => {
          this.traverse(child, action, depth + 1);
        });
      }
    },
    print() {
      let result = "";
      const addLine = (node, depth) => {
        result += depth
          ? `${"|  ".repeat(depth)}|--${node.key}\n`
          : `|--${node.key}\n`;
      };

      this.traverse(this.root, addLine, 0);

      return result;
    }
  };
}
