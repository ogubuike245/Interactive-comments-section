import Comment from "./Comment";

// Comments.jsx
const Comments = ({
  user,
  commentsArray,
  setComments,
  handleAddReply,
  handleEditComment,
  handleDeleteComment,
}) => {
  return (
    // LOOP THROUGH COMMENTS
    <div className="comments-section">
      {commentsArray?.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          currentUser={user}
          comments={commentsArray}
          setComments={setComments}
          handleAddReply={handleAddReply}
          handleEditComment={handleEditComment}
          handleDeleteComment={handleDeleteComment}
        />
      ))}
    </div>
  );
};

export default Comments;
