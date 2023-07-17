// const useNode = () => {
//   const addNode = function (tree, commentId, item) {
//     if (tree.id === commentId) {
//       tree.items.push({
//         id: new Date().getTime(),
//         name: item,
//         items: [],
//       });

//       return tree;
//     }

//     let latestNode = [];
//     latestNode = tree.items.map((ob) => {
//       return addNode(ob, commentId, item);
//     });

//     return { ...tree, items: latestNode };
//   };

//   const updateNode = (tree, commentId, value) => {
//     if (tree.id === commentId) {
//       tree.name = value;
//       return tree;
//     }

//     tree.items.map((ob) => {
//       return updateNode(ob, commentId, value);
//     });

//     return { ...tree };
//   };

//   const removeNode = (tree, id) => {
//     for (let i = 0; i < tree.items.length; i++) {
//       const currentItem = tree.items[i];
//       if (currentItem.id === id) {
//         tree.items.splice(i, 1);
//         return tree;
//       } else {
//         removeNode(currentItem, id);
//       }
//     }
//     return tree;
//   };

//   return { addNode, updateNode, removeNode };
// };

// export default useNode;

const useNode = () => {
  // ... Existing code ...

  const addNode = (tree, commentId, reply) => {
    if (tree.id === commentId) {
      const newReply = {
        id: new Date().getTime().toString(),
        content: reply,
        createdAt: new Date().toLocaleString(),
        score: 0,
        user: {
          image: {
            png: "./images/avatars/image-juliusomo.png",
            webp: "./images/avatars/image-juliusomo.webp",
          },
          username: "juliusomo", // Assuming the new reply is from the current user
        },
        replies: [],
      };

      // If the comment already has a 'replies' array, push the new reply to it.
      // If not, create a new 'replies' array and add the new reply to it.
      if (tree.replies) {
        tree.replies.push(newReply);
      } else {
        tree.replies = [newReply];
      }

      return tree;
    }

    // Check each nested comment for a match.
    // If found, add the reply to that nested comment.
    let latestNode = [];
    latestNode = tree.replies.map((ob) => {
      return addNode(ob, commentId, reply);
    });

    return { ...tree, replies: latestNode };
  };

  return { addNode };
};

export default useNode;
