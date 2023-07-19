// import Comment from "./Comment";

// // Comments.jsx
// const Comments = ({
//   // DATA
//   user,
//   commentsArray,

//   // ACTIONS
//   setComments,
//   handleAddReply,
//   handleEditComment,
//   handleDeleteComment,
//   handleVoting,
// }) => {
//   return (
//     // LOOP THROUGH COMMENTS
//     <div className="comments-section">
//       {commentsArray?.map((comment) => (
//         <Comment
//           key={comment.id}
//           // DATA
//           comment={comment}
//           currentUser={user}
//           comments={commentsArray}
//           // ACTIONS
//           setComments={setComments}
//           handleAddReply={handleAddReply}
//           handleEditComment={handleEditComment}
//           handleDeleteComment={handleDeleteComment}
//           handleVoting={handleVoting}
//         />
//       ))}
//     </div>
//   );
// };

// export default Comments;

import { useState, useEffect } from "react";
import Comment from "./Comment";

// ... (Your other imports)

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
  const [sortedComments, setSortedComments] = useState([]);

  useEffect(() => {
    // Sort the comments by score in descending order (first-level comments)
    const sortedFirstLevelComments = commentsArray
      .filter((comment) => !comment.replyingTo)
      .sort((a, b) => b.score - a.score);

    // Sort the replies by time added (nested replies)
    const sortedReplies = commentsArray
      .filter((comment) => comment.replyingTo)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    // Merge the sorted first-level comments and sorted replies
    const mergedSortedComments = sortedFirstLevelComments.reduce(
      (result, comment) => {
        result.push(comment);
        const commentReplies = sortedReplies.filter(
          (reply) => reply.replyingTo === comment.id
        );
        result.push(...commentReplies);
        return result;
      },
      []
    );

    setSortedComments(mergedSortedComments);
  }, [commentsArray]);

  return (
    // LOOP THROUGH COMMENTS
    <div className="comments-section">
      {sortedComments?.map((comment) => (
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
