import Comment from "./Comment";

const Replies = ({
  comment,
  currentUser,
  handleAddReply,
  handleEditComment,
  handleDeleteComment,
}) => {
  return (
    <div className="replies">
      {comment.replies &&
        comment.replies.length > 0 &&
        comment.replies.map((reply) => (
          <Comment
            key={reply.id}
            comment={reply}
            currentUser={currentUser}
            handleAddReply={handleAddReply}
            handleEditComment={handleEditComment}
            handleDeleteComment={handleDeleteComment}
          />
        ))}
    </div>
  );
};

export default Replies;
