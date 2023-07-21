import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Comment from "./Comment";
import Modal from "../Modal";

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

    setSortedComments(sortedFirstLevelComments);
  }, [commentsArray]);

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
