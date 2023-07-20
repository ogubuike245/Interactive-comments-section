import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Local imports
import Replies from "./Replies";
import ReplyForm from "./FormComponent.jsx";
import EditForm from "./FormComponent.jsx";

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
  const [showEditForm, setShowEditForm] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [score, setScore] = useState(comment.score);

  const toggleReplyForm = () => {
    setShowEditForm(false);
    setShowReplyForm((prev) => !prev);
    setInputValue("");
  };

  const toggleEditForm = () => {
    setShowReplyForm(false);
    setShowEditForm((prev) => !prev);
    setInputValue(comment.content);
  };

  // UPVOTE
  const incrementScore = () => {
    handleVoting(comment.id, 1);
    setScore((prev) => prev + 1);
  };

  // DOWNVOTE
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
    toggleEditForm();
  };

  // DELETE COMMENT
  const handleCommentDelete = () => {
    handleDeleteComment(comment.id);
  };

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
          <span className="date-created">{comment.createdAt}</span>
        </div>

        {/* COMMENT CONTENT  */}
        <div className="content">
          <p>{comment.content}</p>
        </div>

        {/* COMMENT SCORE  */}
        <div className="comment-score">
          <i className="fa fa-minus" onClick={decrementScore}></i>
          <strong>{score}</strong>
          <i className="fa fa-plus" onClick={incrementScore}></i>
        </div>

        {/* COMMENT ACTIONS  */}
        <div className="actions">
          <div onClick={toggleReplyForm}>
            <i className="fa fa-reply"></i>
            <span>Reply</span>
          </div>
          <div onClick={toggleEditForm}>
            <i className="fa fa-edit"></i>
            <span>Edit</span>
          </div>
          <div onClick={handleCommentDelete}>
            <i className="fa fa-trash"></i>
            <span>Delete</span>
          </div>
        </div>
      </motion.article>

      <AnimatePresence mode="wait">
        {showReplyForm ? (
          // {/* SHOW THE REPLY FORM */}
          <ReplyForm
            transition={{ duration: 0.3 }}
            key="reply"
            inputValue={inputValue}
            setInputValue={setInputValue}
            onSubmit={handleCommentReply}
            comment={comment}
            currentUser={currentUser}
            placeholder={"Add a reply..."}
          />
        ) : showEditForm ? (
          // {/* SHOW THE REPLY FORM */}
          <EditForm
            transition={{ duration: 0.3 }}
            key="edit"
            onSubmit={handleCommentUpdate}
            inputValue={inputValue}
            setInputValue={setInputValue}
            currentUser={currentUser}
          />
        ) : null}
      </AnimatePresence>

      {/* COMMENT REPLIES  */}

      <AnimatePresence>
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
