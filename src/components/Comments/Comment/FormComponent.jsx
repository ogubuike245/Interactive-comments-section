import React from "react";
import { motion } from "framer-motion";

// LOCAL IMPORTS
import { commentVariants } from "../../../utils";
const FormComponent = ({
  // DATA
  currentUser,
  inputValue,
  placeholder,
  type,
  // ACTIONS
  onSubmit,
  setInputValue,
}) => {
  return (
    <motion.form
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={commentVariants}
      onSubmit={onSubmit}
      className="reply-form"
    >
      <div className="form-avatar">
        <img src={currentUser.image.png} alt="" />
      </div>

      <textarea
        autoFocus
        name="form-input"
        className="form-input"
        id="form-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
      ></textarea>
      <button type="submit" className="form-button">
        {type}
      </button>
    </motion.form>
  );
};

export default FormComponent;
