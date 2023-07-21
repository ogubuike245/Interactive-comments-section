import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// LOCAL IMPORTS
import Comments from "./Comments";
import FirstLevelCommentForm from "./FirstLevelCommentForm";

// JSON
import userData from "../data/users.json";
import commentsData from "../data/comments.json";

// HOOKS
import useCommentSystem from "../hooks/useCommentSystem";
import useLocalStorage from "../hooks/useLocalStorage";
import useVotesSystem from "../hooks/useVotesSystem";
import UsersList from "./UsersList";

const MainComponent = () => {
  const [currentUser, setCurrentUser] = useLocalStorage(
    "user",
    userData[0] // Set the initial currentUser to the first user from the users.json file
  );

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

  const { updateCommentScore } = useVotesSystem(commentsArray);

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

  // EDIT COMMENTS AND REPLIES
  const handleEditComment = (commentId, commentContent) => {
    const result = editComment(commentsArray, commentId, commentContent);
    setCommentsArray(result);
  };

  // DELETE COMMENTS AND REPLIES
  const handleDeleteComment = (commentId) => {
    const result = deleteComment(commentsArray, commentId);
    setCommentsArray(result);
  };

  // VOTING SYSTEM FOR COMMENTS AND REPLIES
  const handleVoting = (commentId, increment) => {
    const result = updateCommentScore(commentId, increment);
    setCommentsArray(result);
  };

  // Function to handle user selection from list item
  const handleUserSelection = (selectedUser) => {
    setCurrentUser(selectedUser);
  };

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(commentsArray));
  }, [commentsArray]);

  return (
    <section>
      <main>
        <ToastContainer closeOnClick />

        {/* Unordered list with list items */}
        <UsersList
          userData={userData}
          currentUser={currentUser}
          handleUserSelection={handleUserSelection}
        />
        <Comments
          // DATA
          user={currentUser}
          commentsArray={commentsArray}
          // ACTIONS
          setComments={setCommentsArray}
          handleAddReply={handleAddReply}
          handleEditComment={handleEditComment}
          handleDeleteComment={handleDeleteComment}
          handleVoting={handleVoting}
        />

        <FirstLevelCommentForm
          // DATA
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
