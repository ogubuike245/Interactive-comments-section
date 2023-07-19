import Comment from "./Comment";

// Comments.jsx
const Comments = ({
  // DATA
  user,
  commentsArray,

  // ACTIONS
  setComments,
  handleAddReply,
  handleEditComment,
  handleDeleteComment,
  handleVoting,
}) => {
  return (
    // LOOP THROUGH COMMENTS
    <div className="comments-section">
      {commentsArray?.map((comment) => (
        <Comment
          key={comment.id}
          // DATA
          comment={comment}
          currentUser={user}
          comments={commentsArray}
          // ACTIONS
          setComments={setComments}
          handleAddReply={handleAddReply}
          handleEditComment={handleEditComment}
          handleDeleteComment={handleDeleteComment}
          handleVoting={handleVoting}
        />
      ))}
    </div>
  );
};

export default Comments;
