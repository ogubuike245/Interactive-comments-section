const useVotesSystem = (commentsArray) => {
  const updateCommentScore = (id, increment) => {
    const updateRecursive = (comment) => {
      if (comment.id === id) {
        return {
          ...comment,
          score: comment.score + increment,
        };
      }

      if (comment.replies) {
        comment.replies = comment.replies.map(updateRecursive);
      }

      return comment;
    };

    return commentsArray.map(updateRecursive);
  };

  return { updateCommentScore };
};

export default useVotesSystem;
