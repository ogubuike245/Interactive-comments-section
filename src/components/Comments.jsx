import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Comment from "./Comment";

const Comments = ({
  // DATA
  user,
  commentsArray,

  // ACTIONS
  setComments,
  handleAddReply,
  handleEditComment,
  handleDeleteComment,
  handleVoting,
}) => {
  const [sortedComments, setSortedComments] = useState([]);

  useEffect(() => {
    // Sort the comments by score in descending order (first-level comments)
    const sortedFirstLevelComments = commentsArray
      .filter((comment) => !comment.replyingTo)
      .sort((a, b) => b.score - a.score);

    // Sort the replies by time added (nested replies)
    const sortedReplies = commentsArray
      .filter((comment) => comment.replyingTo)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    // Merge the sorted first-level comments and sorted replies
    const mergedSortedComments = sortedFirstLevelComments.reduce(
      (result, comment) => {
        result.push(comment);
        const commentReplies = sortedReplies.filter(
          (reply) => reply.replyingTo === comment.id
        );
        result.push(...commentReplies);
        return result;
      },
      []
    );

    setSortedComments(mergedSortedComments);
  }, [commentsArray]);

  // New comment slide in animation

  return (
    // LOOP THROUGH COMMENTS
    <div className="comments-section">
      <AnimatePresence>
        {sortedComments?.map((comment) => (
          <Comment
            transition={{ duration: 0.3 }}
            key={comment.id}
            // DATA
            comment={comment}
            currentUser={user}
            comments={commentsArray}
            // ACTIONS
            setComments={setComments}
            handleAddReply={handleAddReply}
            handleEditComment={handleEditComment}
            handleDeleteComment={handleDeleteComment}
            handleVoting={handleVoting}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Comments;
