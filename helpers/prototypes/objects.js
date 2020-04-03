export const createTree = (object, treeArray, value = {}) => {
  const treePart = treeArray.shift();
  if (treePart) {
    if (treeArray.length === 0) {
      if (!object[treePart]) object[treePart] = value;
    } else {
      if (!object[treePart]) object[treePart] = {};

      createTree(object[treePart], treeArray, value);
    }
  }
};
