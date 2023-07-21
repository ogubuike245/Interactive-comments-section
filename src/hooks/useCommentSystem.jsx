import { v4 as generateRandomId } from "uuid";

const useCommentSystem = (currentUser) => {
  const { username, image } = currentUser;
  const { png, webp } = image;

  // REUSABLE FUNCTIONS
  const extractExistingIds = (comments) => {
    const ids = new Set();
    comments.forEach((comment) => {
      ids.add(comment.id);
      if (comment.replies && comment.replies.length > 0) {
        const replyIds = extractExistingIds(comment.replies);
        replyIds.forEach((replyId) => ids.add(replyId));
      }
    });
    return ids;
  };

  const createComment = (existingIds, commentContent, to) => {
    let newId;
    do {
      newId = generateRandomId();
    } while (existingIds.has(newId));

    existingIds.add(newId);

    const comment = {
      id: newId,
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

  // CREATE TOP LEVEL COMMENTS
  const createFirstLevelComment = (comments, commentContent) => {
    const existingIds = extractExistingIds(comments);
    const newComment = createComment(existingIds, commentContent);
    return [...comments, newComment];
  };

  // COMMENT REPLIES
  const createCommentReply = (comments, commentId, commentContent) => {
    const insertRecursiveReply = (comment) => {
      const existingIds = extractExistingIds(comments);
      const newComment = createComment(
        existingIds,
        commentContent,
        comment.user.username
      );

      if (comment.id === commentId) {
        if (username !== comment.user.username) {
          return {
            ...comment,
            replies: comment.replies
              ? [...comment.replies, newComment]
              : [newComment],
          };
        } else {
          console.log("You cannot reply to your own comment.");
        }
      }

      if (comment.replies && comment.replies.length > 0) {
        comment.replies = comment.replies.map(insertRecursiveReply);
      }

      return comment;
    };

    const updatedComments = [...comments];
    return updatedComments.map(insertRecursiveReply);
  };

  // EDIT COMMENTS OR REPLIES
  const editComment = (comments, id, content) => {
    const editRecursive = (comment) => {
      if (comment.id === id) {
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
    };

    return comments.map(editRecursive);
  };

  // DELETE COMMENTS OR REPLIES
  const deleteComment = (comments, id) => {
    const deleteRecursive = (comment) => {
      if (comment.id === id) {
        if (username !== comment.user.username) {
          console.log("You are not the owner!");
          return comment;
        }
        return null;
      }

      if (comment.replies) {
        comment.replies = comment.replies.filter(deleteRecursive);
      }

      return comment;
    };

    return comments.filter(deleteRecursive);
  };

  return {
    createFirstLevelComment,
    createCommentReply,
    editComment,
    deleteComment,
  };
};

export default useCommentSystem;
