import React from "react";

const Modal = ({ handleCommentDelete, handleModalState }) => {
  return (
    <article className="modal-container">
      <div className="modal">
        <h1>Delete Comment</h1>

        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>

        <div className="modal-buttons">
          <button className="cancel" onClick={handleModalState}>
            No, cancel
          </button>
          <button className="delete" onClick={handleCommentDelete}>
            Yes, delete
          </button>
        </div>
      </div>
    </article>
  );
};

export default Modal;
