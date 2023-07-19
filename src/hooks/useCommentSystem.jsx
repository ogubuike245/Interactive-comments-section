const useCommentSystem = (currentUser) => {
  const { username, image } = currentUser;
  const { png, webp } = image;

  const createFirstLevelComment = (comments, commentContent) => {
    const newComment = createComment(commentContent);
    return [...comments, newComment];
  };

  const createCommentReply = (comments, commentId, commentContent) => {
    const insertRecursiveReply = (comment) => {
      const newComment = createComment(commentContent, comment.user.username);

      if (comment.id === commentId) {
        return {
          ...comment,
          replies: comment.replies
            ? [...comment.replies, newComment]
            : [newComment],
        };
      }

      if (comment.replies && comment.replies.length > 0) {
        comment.replies = comment.replies.map(insertRecursiveReply);
      }

      return comment;
    };

    const updatedComments = [...comments];
    return updatedComments.map(insertRecursiveReply);
  };

  function editComment(comments, id, content) {
    function editRecursive(comment) {
      if (comment.id === id) {
        comment.content = content;
      }

      if (comment.replies) {
        comment.replies = comment.replies.map(editRecursive);
      }

      return comment;
    }

    return comments.map(editRecursive);
  }

  function deleteComment(comments, id) {
    function deleteRecursive(comment) {
      // If match, return null to "delete" comment
      if (comment.id === id) {
        return null;
      }

      // Filter out deleted replies
      if (comment.replies) {
        comment.replies = comment.replies.filter(deleteRecursive);
      }

      return comment;
    }

    return comments.filter(deleteRecursive);
  }

  // REUSABLE
  const createComment = (commentContent, to) => {
    return {
      id: new Date().getTime().toString(),
      content: commentContent,
      createdAt: new Date().toLocaleString(),
      score: 0,
      replyingTo: to,
      user: {
        image: { png, webp },
        username,
      },
      replies: [],
    };
  };

  return {
    createFirstLevelComment,
    createCommentReply,
    editComment,
    deleteComment,
  };
};

export default useCommentSystem;
