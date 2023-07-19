import { useState, useEffect } from "react";

// LOCAL IMPORTS
import Comments from "./Comments";
import FirstLevelCommentForm from "./FirstLevelCommentForm";

// JSON
import userData from "../user.json";
import commentsData from "../comments.json";

// HOOKS
import useCommentSystem from "../hooks/useCommentSystem";
import useLocalStorage from "../hooks/useLocalStorage";

const MainComponent = () => {
  const [currentUser, setCurrentUser] = useState(userData.currentUser);

  const [commentsArray, setCommentsArray] = useLocalStorage(
    "comments",
    commentsData
  );

  const {
    createFirstLevelComment,
    createCommentReply,
    editComment,
    deleteComment,
  } = useCommentSystem(currentUser);

  // CREATE A FIRST LEVEL COMMENT
  const handleAddComment = (comments, commentContent) => {
    const result = createFirstLevelComment(comments, commentContent);
    setCommentsArray(result);
  };

  // REPLY TO FIRST LEVEL COMMENT
  const handleAddReply = (commentId, commentContent) => {
    const updatedComments = createCommentReply(
      commentsArray,
      commentId,
      commentContent
    );
    setCommentsArray(updatedComments);
  };

  //EDIT COMMENTS AND REPLIES
  const handleEditComment = (commentId, commentContent) => {
    const result = editComment(commentsArray, commentId, commentContent);
    setCommentsArray(result);
  };

  // DELETE COMMENTS AND REPLIES
  const handleDeleteComment = (commentId) => {
    const result = deleteComment(commentsArray, commentId);
    setCommentsArray(result);
  };

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(commentsArray));
  }, [commentsArray]);

  return (
    <section>
      <main>
        <Comments
          user={currentUser}
          commentsArray={commentsArray}
          setComments={setCommentsArray}
          handleAddReply={handleAddReply}
          handleEditComment={handleEditComment}
          handleDeleteComment={handleDeleteComment}
        />

        <FirstLevelCommentForm
          // data
          user={currentUser}
          commentsArray={commentsArray}
          // ACTIONS
          handleAddComment={handleAddComment}
        />
      </main>
    </section>
  );
};

export default MainComponent;
