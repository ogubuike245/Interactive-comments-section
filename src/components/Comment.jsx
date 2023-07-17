import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

// Utility function to format the comment date
function formatCommentDate(createdAt) {
  const createdAtDate = dayjs(createdAt);
  return createdAtDate.fromNow();
}

// Local imports
import Replies from "./Replies";
import useNode from "../hooks/useNode";
import ReplyForm from "./ReplyForm";

const Comment = ({
  comment,
  currentUser,
  handleAddReply,
  handleEditComment,
  handleDeleteComment,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyInput, setReplyInput] = useState("");

  const { addNode, updateNode, removeNode } = useNode();

  const toggleReplyForm = () => {
    setShowReplyForm((prev) => !prev);
    setReplyInput(""); // Clear the input field when showing/hiding the form
  };

  const handleCommentReply = (event) => {
    event.preventDefault();
    addNode(comment, comment.id, replyInput);
    toggleReplyForm();
  };
  const handleCommentDelete = (event) => {
    event.preventDefault();
    addNode(comment, comment.id, replyInput);
    toggleReplyForm();
  };
  const handleCommentUpdate = (event) => {
    event.preventDefault();
    addNode(comment, comment.id, replyInput);
    toggleReplyForm();
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
          <span className="date-created">{formatCommentDate(comment)}</span>
        </div>

        {/* COMMENT CONTENT  */}
        <div className="content">
          <p>{comment.content}</p>
        </div>

        {/* COMMENT SCORE  */}
        <div className="comment-score">
          <i className="fa fa-minus"></i>
          <strong>{comment.score}</strong>
          <i className="fa fa-plus"></i>
        </div>

        {/* COMMENT ACTIONS  */}
        <div className="actions" onClick={toggleReplyForm}>
          <i className="fa fa-reply"></i>
          <span>Reply</span>
        </div>
      </article>

      {/* SHOW THE REPLY FORM */}
      {showReplyForm && (
        <ReplyForm
          handleCommentReply={handleCommentReply}
          replyInput={replyInput}
          setReplyInput={setReplyInput}
          comment={comment}
          currentUser={currentUser}
        />
      )}

      {/* COMMENT REPLIES  */}
      <Replies comment={comment} currentUser={currentUser} />
    </>
  );
};

export default Comment;
