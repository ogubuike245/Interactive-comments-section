import React from "react";

const ScoreComponent = ({ commentScore, decrementScore, incrementScore }) => {
  return (
    <div className="comment-score">
      <i className="fa fa-plus" onClick={incrementScore}></i>
      <strong>{commentScore}</strong>
      <i className="fa fa-minus" onClick={decrementScore}></i>
    </div>
  );
};

export default ScoreComponent;
