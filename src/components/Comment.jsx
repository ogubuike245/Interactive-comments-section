import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Local imports
import Replies from "./Replies";
import FormComponent from "./FormComponent.jsx";

const commentVariants = {
  hidden: {
    opacity: 0,
    x: -50,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "slide",
      stiffness: 20,
      damping: 5,
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    x: -50,
  },
};
const Comment = ({
  //  DATA
  currentUser,
  comment,

  // ACTIONS
  handleAddReply,
  handleEditComment,
  handleDeleteComment,
  handleVoting,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [contentEditable, setContentEditable] = useState(false);
  const [score, setScore] = useState(comment.score);

  // Function to calculate time difference between now and the comment's createdAt
  const getTimeDifference = () => {
    const createdAt = new Date(comment.createdAt);
    const now = new Date();
    const differenceInSeconds = Math.floor((now - createdAt) / 1000);

    if (differenceInSeconds < 60) {
      return `${differenceInSeconds}s ago`;
    } else if (differenceInSeconds < 3600) {
      return `${Math.floor(differenceInSeconds / 60)}m ago`;
    } else if (differenceInSeconds < 86400) {
      return `${Math.floor(differenceInSeconds / 3600)}h ago`;
    } else if (differenceInSeconds < 2592000) {
      return `${Math.floor(differenceInSeconds / 86400)}d ago`;
    } else if (differenceInSeconds < 31536000) {
      return `${Math.floor(differenceInSeconds / 2592000)}mo ago`;
    } else {
      return `${Math.floor(differenceInSeconds / 31536000)}y ago`;
    }
  };

  const toggleReplyForm = () => {
    setShowReplyForm((prev) => !prev);
    setInputValue("");
  };

  const toggleEdit = () => {
    setContentEditable((prev) => !prev);
    setInputValue(comment.content);
  };

  // UPvOTE
  const incrementScore = () => {
    handleVoting(comment.id, 1);
    setScore((prev) => prev + 1);
  };

  // DOWNvOTE
  const decrementScore = () => {
    handleVoting(comment.id, -1);
    setScore((prev) => prev - 1);
  };

  // REPLY COMMENT
  const handleCommentReply = (event) => {
    event.preventDefault();

    handleAddReply(comment.id, inputValue);
    toggleReplyForm();
  };
  // EDIT COMMENT
  const handleCommentUpdate = (event) => {
    event.preventDefault();

    handleEditComment(comment.id, inputValue);
    setContentEditable(false);
  };

  // DELETE COMMENT
  const handleCommentDelete = () => {
    handleDeleteComment(comment.id);
  };

  return (
    <>
      <motion.article
        variants={commentVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="comment"
      >
        {/* USER INFO AREA  */}
        <div className="user-info">
          <div className="user-avatar">
            <img src={comment.user.image.png} alt={comment.user.username} />
          </div>
          <span className="username">{comment.user.username}</span>
          {currentUser.username === comment.user.username && (
            <span className="user-check">you</span>
          )}
          <span className="date-created">{getTimeDifference()}</span>
        </div>

        {/* COMMENT CONTENT  */}
        <div className="content">
          {contentEditable ? (
            <div className="editing">
              <textarea
                autoFocus={contentEditable}
                name=""
                id=""
                rows="5"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={contentEditable ? "edit" : ""}
              ></textarea>

              <button onClick={handleCommentUpdate}>UPDATE</button>
            </div>
          ) : (
            <p>
              <strong>{comment.replyingTo && `@${comment.replyingTo} `}</strong>
              {comment.content}
            </p>
          )}
        </div>

        {/* COMMENT SCORE  */}
        <div className="comment-score">
          <i className="fa fa-minus" onClick={decrementScore}></i>
          <strong>{score}</strong>
          <i className="fa fa-plus" onClick={incrementScore}></i>
        </div>

        {/* COMMENT ACTIONS  */}
        <div className="actions">
          {currentUser.username != comment.user.username && (
            <div onClick={toggleReplyForm} className="reply-icon">
              <i className="fa fa-reply"></i>
              <span>Reply</span>
            </div>
          )}

          {currentUser.username === comment.user.username && (
            <>
              <div onClick={toggleEdit} className="edit-icon">
                <i className="fa fa-edit"></i>
                <span>Edit</span>
              </div>
              <div onClick={handleCommentDelete} className="delete-icon">
                <i className="fa fa-trash"></i>
                <span>Delete</span>
              </div>
            </>
          )}
        </div>
      </motion.article>

      <AnimatePresence mode="wait">
        {/* SHOW THE REPLY FORM */}
        {showReplyForm && (
          <FormComponent
            transition={{ duration: 0.3 }}
            key="reply"
            inputValue={inputValue}
            setInputValue={setInputValue}
            onSubmit={handleCommentReply}
            comment={comment}
            currentUser={currentUser}
            placeholder={"Add a reply..."}
            type={"Reply"}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {/* COMMENT REPLIES  */}
        <Replies
          // DATA
          comment={comment}
          currentUser={currentUser}
          // ACTIONS
          handleAddReply={handleAddReply}
          handleEditComment={handleEditComment}
          handleDeleteComment={handleDeleteComment}
          handleVoting={handleVoting}
        />
      </AnimatePresence>
    </>
  );
};

export default Comment;
