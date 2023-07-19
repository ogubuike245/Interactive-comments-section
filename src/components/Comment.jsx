import { useState } from "react";

// Local imports
import Replies from "./Replies";
import FormComponent from "./FormComponent.jsx";

const Comment = ({
  // INITIAL DATA
  currentUser,
  comment,
  handleAddReply,
  handleEditComment,
  handleDeleteComment,
  updateCommentScore,

  // ACTIONS
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [score, setScore] = useState(comment.score);

  const toggleReplyForm = () => {
    setShowReplyForm((prev) => !prev);
    setInputValue("");
  };

  const toggleEditForm = () => {
    setShowEditForm((prev) => !prev);
    setInputValue(comment.content);
  };

  const incrementScore = () => {
    updateCommentScore(comment.id, 1);
    setScore((prev) => prev + 1);
  };

  const decrementScore = () => {
    updateCommentScore(comment.id, -1);
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

  return (
    <>
      <article className="comment">
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
      </article>

      {/* SHOW THE REPLY FORM */}
      {showReplyForm && (
        <FormComponent
          onSubmit={handleCommentReply}
          inputValue={inputValue}
          setInputValue={setInputValue}
          currentUser={currentUser}
          placeholder={"Add a reply..."}
        />
      )}
      {/* SHOW THE REPLY FORM */}
      {showEditForm && (
        <FormComponent
          onSubmit={handleCommentUpdate}
          inputValue={inputValue}
          setInputValue={setInputValue}
          comment={comment}
          currentUser={currentUser}
        />
      )}

      {/* COMMENT REPLIES  */}
      <Replies
        comment={comment}
        currentUser={currentUser}
        handleAddReply={handleAddReply}
        handleEditComment={handleEditComment}
        handleDeleteComment={handleDeleteComment}
        updateCommentScore={updateCommentScore}
      />
    </>
  );
};

export default Comment;
