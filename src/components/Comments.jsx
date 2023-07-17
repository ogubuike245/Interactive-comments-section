import React from "react";
import Comment from "./Comment";
import useNode from "../hooks/useNode";

const Comments = ({
  comments,
  handleAddReply,
  handleEditComment,
  handleDeleteComment,
}) => {
  return (
    // LOOP THROUGH COMMENTS
    <div className="comments-section">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          handleAddReply={handleAddReply}
          handleEditComment={handleEditComment}
          handleDeleteComment={handleDeleteComment}
        />
      ))}
    </div>
  );
};

export default Comments;
