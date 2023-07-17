import { useState, useRef, useEffect } from "react";
import Comments from "./Comments";
import CreateCommentForm from "./CreateCommentForm";

// JSON
import jsonData from "../data.json";
import useNode from "../hooks/useNode";

const MainComponent = () => {
  const [commentsData, setCommentsData] = useState(jsonData);

  const [editMode, setEditMode] = useState(false);

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
          commentsData={commentsData}
          handleAddReply={handleAddReply}
          handleEditComment={handleEditComment}
          handleDeleteComment={handleDeleteComment}
        />
        <CreateCommentForm
          commentsData={commentsData}
          setCommentsData={setCommentsData}
        />
      </main>
    </section>
  );
};

export default MainComponent;
