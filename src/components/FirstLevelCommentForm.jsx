import { useState } from "react";
import { showToast } from "../utils";

const FirstLevelCommentForm = ({ user, commentsArray, handleAddComment }) => {
  const [input, setInput] = useState("");

  const handleCreateComment = (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      return showToast("Comment cannot be empty. Please enter your comment.");
    } else {
      handleAddComment(commentsArray, input);
      showToast("Reply posted successfully!");
      setInput("");
    }
  };

  return (
    <form className="comment-form" onSubmit={handleCreateComment}>
      <div className="form-avatar">
        <img src={user.image.png} alt="" />
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

export default FirstLevelCommentForm;
