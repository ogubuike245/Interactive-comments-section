import React, { useState } from "react";
import Comments from "./Comments";
import CreateCommentForm from "./CreateCommentForm";

// JSON
import jsonData from "../data.json";
import useNode from "../hooks/useNode";

const MainComponent = () => {
  const [commentsData, setCommentsData] = useState(jsonData);

  const { addNode, updateNode, removeNode } = useNode(); // Destructure functions

  const handleAddReply = (item) => {
    const updatedComment = addNode(comment, comment.id, item);
  };

  const handleEditComment = (value) => {
    const updatedComment = updateNode(comment, comment.id, value);
  };

  const handleDeleteComment = () => {
    const updatedComments = removeNode(comments, comment.id);
  };
  return (
    <section>
      <main>
        <Comments
          comments={commentsData.comments}
          handleAddReply={handleAddReply}
          handleEditComment={handleEditComment}
          handleDeleteComment={handleDeleteComment}
        />
        <CreateCommentForm currentUser={commentsData.currentUser} />
      </main>
    </section>
  );
};

export default MainComponent;
