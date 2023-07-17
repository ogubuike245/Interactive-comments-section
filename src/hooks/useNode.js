const useNode = () => {
  const addNode = function (tree, commentId, item) {
    if (tree.id === commentId) {
      tree.items.push({
        id: new Date().getTime(),
        name: item,
        items: [],
      });

      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((ob) => {
      return addNode(ob, commentId, item);
    });

    return { ...tree, items: latestNode };
  };

  const updateNode = (tree, commentId, value) => {
    if (tree.id === commentId) {
      tree.name = value;
      return tree;
    }

    tree.items.map((ob) => {
      return updateNode(ob, commentId, value);
    });

    return { ...tree };
  };

  const removeNode = (tree, id) => {
    for (let i = 0; i < tree.items.length; i++) {
      const currentItem = tree.items[i];
      if (currentItem.id === id) {
        tree.items.splice(i, 1);
        return tree;
      } else {
        removeNode(currentItem, id);
      }
    }
    return tree;
  };

  return { addNode, updateNode, removeNode };
};

export default useNode;
