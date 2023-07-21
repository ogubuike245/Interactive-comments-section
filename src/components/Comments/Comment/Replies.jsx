import { motion, AnimatePresence } from "framer-motion";
import Comment from ".";

const Replies = ({
  // DATA
  comment,
  currentUser,

  // ACTIONS
  handleAddReply,
  handleEditComment,
  handleDeleteComment,
  handleVoting,
}) => {
  const { replies } = comment;
  return (
    <div className="replies">
      <AnimatePresence>
        {replies &&
          replies.length > 0 &&
          replies.map((reply) => (
            <Comment
              key={reply.id}
              // DATA
              comment={reply}
              currentUser={currentUser}
              // ACTIONS
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

export default Replies;
