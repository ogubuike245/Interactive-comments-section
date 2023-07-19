import { useState } from "react";

// Local imports
import Replies from "./Replies";
import FormComponent from "./FormComponent.jsx";

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
        // DATA
        comment={comment}
        currentUser={currentUser}
        // ACTIONS
        handleAddReply={handleAddReply}
        handleEditComment={handleEditComment}
        handleDeleteComment={handleDeleteComment}
        handleVoting={handleVoting}
      />
    </>
  );
};

export default Comment;
