import React from "react";
import Comment from "./Comment";

const Replies = ({ comment }) => {
  return (
    <div className="replies">
      {comment.replies &&
        comment.replies.length > 0 &&
        comment.replies.map((reply) => (
          <Comment key={reply.id} comment={reply} />
        ))}
    </div>
  );
};

export default Replies;
