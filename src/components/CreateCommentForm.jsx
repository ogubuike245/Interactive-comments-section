import React from "react";

const CreateCommentForm = ({ currentUser }) => {
  return (
    <form className="form-container">
      <div className="user-avatar">
        <img src={currentUser.image.png} alt="" />
      </div>

      <input type="text" className="comment-box" placeholder="Add a comment" />

      <button>SEND</button>
    </form>
  );
};

export default CreateCommentForm;
