const useCommentSystem = (currentUser) => {
  const { username, image } = currentUser;
  const { png, webp } = image;
  /**
   *
   *
   * @param {*} comments
   * @param {*} commentContent
   * @return {*}
   */
  const createFirstLevelComment = (comments, commentContent) => {
    const newComment = createComment(commentContent);
    return [...comments, newComment];
  };
  /**
   *
   *
   * @param {*} comments
   * @param {*} commentId
   * @param {*} commentContent
   * @return {*}
   */
  const createCommentReply = (comments, commentId, commentContent) => {
    const insertRecursiveReply = (comment) => {
      const newComment = createComment(commentContent, comment.user.username);

      if (username !== comment.user.username) {
        if (comment.id === commentId) {
          // Check if the current user is not the comment creator
          return {
            ...comment,
            replies: comment.replies
              ? [...comment.replies, newComment]
              : [newComment],
          };
        }
      } else {
        console.log("You cannot reply to your own comment.");
      }

      if (comment.replies && comment.replies.length > 0) {
        comment.replies = comment.replies.map(insertRecursiveReply);
      }

      return comment;
    };

    const updatedComments = [...comments];
    return updatedComments.map(insertRecursiveReply);
  };
  /**
   *
   *
   * @param {*} comments
   * @param {*} id
   * @param {*} content
   * @return {*}
   */
  function editComment(comments, id, content) {
    function editRecursive(comment) {
      if (comment.id === id) {
        // Check if the current user is the comment creator
        if (username === comment.user.username) {
          comment.content = content;
        } else {
          console.log("You cannot edit this comment. You are not the creator.");
        }
      }

      if (comment.replies) {
        comment.replies = comment.replies.map(editRecursive);
      }

      return comment;
    }

    return comments.map(editRecursive);
  }
  /**
   *
   *
   * @param {*} comments
   * @param {*} id
   * @return {*}
   */
  function deleteComment(comments, id) {
    function deleteRecursive(comment) {
      // If match, return null to "delete" comment

      if (comment.id === id) {
        if (username !== comment.user.username) {
          console.log("You are not the owner!");
          return comment;
        }

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
    const comment = {
      id: new Date().getTime().toString(),
      content: commentContent,
      createdAt: new Date().toLocaleString(),
      score: 0,
      user: {
        image: { png, webp },
        username,
      },
      replies: [],
    };

    return {
      ...comment,
      ...(to && { replyingTo: to }),
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
