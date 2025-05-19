export const addClassToNode = (node, className = 'ph') => {
  // Add a classname to the current node
  if (
    node.attributes.class &&
    node.attributes.class.indexOf(className) === -1
  ) {
    node.attributes.class = `${node.attributes.class} ${className}`;
  } else if (!node.attributes.class) {
    node.attributes.class = className;
  }

  // Process children nodes recursively
  if (node.children) {
    node.children = node.children.map((node) =>
      addClassToNode(node, className)
    );
  }

  return node;
};
