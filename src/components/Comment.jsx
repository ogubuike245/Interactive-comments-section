import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

// Utility function to format the comment date
function formatCommentDate(createdAt) {
  const createdAtDate = dayjs(createdAt);
  return createdAtDate.fromNow();
}

// Local imports
import Replies from "./Replies";
import useNode from "../hooks/useNode";

const Comment = ({
  comment,
  handleAddReply,
  handleEditComment,
  handleDeleteComment,
}) => {
  return (
    <>
      <article className="comment">
        {/* USER INFO AREA  */}
        <div className="user-info">
          <div className="user-avatar">
            <img src={comment.user.image.png} alt={comment.user.username} />
          </div>
          <span className="username">{comment.user.username}</span>
          <span className="date-created">{formatCommentDate(comment)}</span>
        </div>

        {/* COMMENT CONTENT  */}
        <div className="content">
          <p>{comment.content}</p>
        </div>

        {/* COMMENT SCORE  */}
        <div className="comment-score">
          <i className="fa fa-minus"></i>
          <strong>{comment.score}</strong>
          <i className="fa fa-plus"></i>
        </div>

        {/* COMMENT ACTIONS  */}
        <div className="actions">
          <i className="fa fa-reply"></i>
          <span>Reply</span>
        </div>
      </article>

      {/* COMMENT REPLIES  */}
      <Replies comment={comment} />
    </>
  );
};

export default Comment;
