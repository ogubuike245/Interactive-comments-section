import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Local imports
import Replies from "./Replies";
import FormComponent from "./FormComponent.jsx";
import { commentVariants, getTimeDifference, showToast } from "../../../utils";
import ScoreComponent from "./ScoreComponent";
import ActionsComponent from "./ActionsComponent";
import Modal from "../../Modal";

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
  const [showModal, setShowModal] = useState(false);

  const { score, content, createdAt, replyingTo } = comment;
  const [commentScore, setCommentScore] = useState(score);

  const handleModalState = () => {
    setShowModal((prev) => !prev);
  };
  const toggleReplyForm = () => {
    setShowReplyForm((prev) => !prev);
    setInputValue("");
  };

  const toggleEdit = () => {
    setContentEditable((prev) => !prev);
    setInputValue(content);
  };

  // UPvOTE
  const incrementScore = () => {
    handleVoting(comment.id, 1);
    setCommentScore((prev) => prev + 1);
  };

  // DOWNvOTE
  const decrementScore = () => {
    handleVoting(comment.id, -1);
    setCommentScore((prev) => prev - 1);
  };

  // REPLY COMMENT
  const handleCommentReply = (event) => {
    event.preventDefault();
    if (inputValue.trim() === "") {
      showToast("Comment cannot be empty. Please enter your comment.", "error");
    } else {
      handleAddReply(comment.id, inputValue);
      showToast("Reply posted successfully!");
      toggleReplyForm();
    }
  };

  // EDIT COMMENT
  const handleCommentUpdate = (event) => {
    event.preventDefault();
    if (inputValue.trim() === "") {
      showToast("Comment cannot be empty. Please enter your comment.", "error");
    } else {
      handleEditComment(comment.id, inputValue);
      showToast("Comment updated successfully!");
      setContentEditable(false);
    }
  };

  // DELETE COMMENT
  const handleCommentDelete = () => {
    handleDeleteComment(comment.id);
    setShowModal((prev) => !prev);
    showToast("Your comment has been removed");
  };
  return (
    <>
      {currentUser.username === comment.user.username && showModal && (
        <Modal
          handleCommentDelete={handleCommentDelete}
          handleModalState={handleModalState}
        />
      )}
      <motion.article
        variants={commentVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="comment"
        style={!comment.replyingTo && { border: "1px solid var(--LightGray)" }}
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
          <span className="date-created">{getTimeDifference(createdAt)}</span>
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
              ></textarea>

              <button onClick={handleCommentUpdate}>UPDATE</button>
            </div>
          ) : (
            <p>
              <strong>{replyingTo && `@${replyingTo} `}</strong>
              {content}
            </p>
          )}
        </div>

        {/* COMMENT SCORE  */}
        <ScoreComponent
          commentScore={commentScore}
          decrementScore={decrementScore}
          incrementScore={incrementScore}
        />

        {/* COMMENT ACTIONS  */}
        <ActionsComponent
          currentUser={currentUser}
          toggleEdit={toggleEdit}
          handleModalState={handleModalState}
          toggleReplyForm={toggleReplyForm}
          comment={comment}
        />
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
