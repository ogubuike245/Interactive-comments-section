import { motion, AnimatePresence } from "framer-motion";
import Comment from "./Comment";

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
  return (
    <div className="replies">
      <AnimatePresence>
        {comment.replies &&
          comment.replies.length > 0 &&
          comment.replies.map((reply) => (
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
