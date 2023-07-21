import React from "react";

const ActionsComponent = ({
  currentUser,
  toggleEdit,
  handleModalState,
  toggleReplyForm,
  comment,
}) => {
  return (
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
          <div onClick={handleModalState} className="delete-icon">
            <i className="fa fa-trash"></i>
            <span>Delete</span>
          </div>
        </>
      )}
    </div>
  );
};

export default ActionsComponent;
