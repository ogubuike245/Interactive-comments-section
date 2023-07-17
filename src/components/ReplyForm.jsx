import React from "react";

const ReplyForm = ({
  handleCommentReply,
  replyInput,
  setReplyInput,
  currentUser,
}) => {
  return (
    <form onSubmit={handleCommentReply} className="reply-form">
      <div className="form-avatar">
        <img src={currentUser.image.png} alt="" />
      </div>

      <textarea
        name="form-input"
        className="form-input"
        id="form-input"
        value={replyInput}
        onChange={(e) => setReplyInput(e.target.value)}
        placeholder="Add a reply..."
      ></textarea>
      <button type="submit" className="form-button">
        Send
      </button>
    </form>
  );
};

export default ReplyForm;
