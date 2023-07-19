import React from "react";

const FormComponent = ({
  onSubmit,
  inputValue,
  setInputValue,
  currentUser,
  placeholder,
}) => {
  return (
    <form onSubmit={onSubmit} className="reply-form">
      <div className="form-avatar">
        <img src={currentUser.image.png} alt="" />
      </div>

      <textarea
        name="form-input"
        className="form-input"
        id="form-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
      ></textarea>
      <button type="submit" className="form-button">
        Send
      </button>
    </form>
  );
};

export default FormComponent;
