import React, { useState, useRef, useEffect } from "react";

const CreateCommentForm = ({ commentsData, setCommentsData }) => {
  const [input, setInput] = useState("");

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    // Generate a new comment object
    const newComment = {
      id: new Date().getTime().toString(),
      content: input,
      createdAt: new Date().toLocaleString(),
      score: 0,
      user: {
        image: {
          png: commentsData.currentUser.image.png,
          webp: commentsData.currentUser.image.webp,
        },
        username: commentsData.currentUser.username, // Assuming the new comment is from the current user
      },
      replies: [],
    };

    // Create a new comments array with the new comment added
    const updatedCommentsData = {
      ...commentsData,
      comments: [...commentsData.comments, newComment],
    };

    // Call the setCommentsData function to update the state
    setCommentsData(updatedCommentsData);

    // Clear the input field after submitting
    setInput("");
  };

  return (
    <form className="comment-form" onSubmit={handleAddComment}>
      <div className="form-avatar">
        <img src={commentsData.currentUser.image.png} alt="" />
      </div>

      <textarea
        name="form-input"
        className="form-input"
        id="form-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a comment..."
      ></textarea>

      <button type="submit" className="form-button">
        SEND
      </button>
    </form>
  );
};

export default CreateCommentForm;
