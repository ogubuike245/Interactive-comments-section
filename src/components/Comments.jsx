import React from "react";
import Comment from "./Comment";
import useNode from "../hooks/useNode";

const Comments = ({
  commentsData,
  handleAddReply,
  handleEditComment,
  handleDeleteComment,
}) => {
  return (
    // LOOP THROUGH COMMENTS
    <div className="comments-section">
      {commentsData.comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          currentUser={commentsData.currentUser}
          handleAddReply={handleAddReply}
          handleEditComment={handleEditComment}
          handleDeleteComment={handleDeleteComment}
        />
      ))}
    </div>
  );
};

export default Comments;
