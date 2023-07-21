import { toast } from "react-toastify";

export const commentVariants = {
  hidden: {
    opacity: 0,
    x: -50,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "slide",
      stiffness: 20,
      damping: 5,
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    x: -50,
  },
};

// Function to calculate time difference between now and the comment's createdAt

export const getTimeDifference = (value) => {
  const createdAt = new Date(value);
  const now = new Date();
  const differenceInSeconds = Math.floor((now - createdAt) / 1000);

  if (differenceInSeconds < 60) {
    return `${differenceInSeconds}s ago`;
  } else if (differenceInSeconds < 3600) {
    return `${Math.floor(differenceInSeconds / 60)}m ago`;
  } else if (differenceInSeconds < 86400) {
    return `${Math.floor(differenceInSeconds / 3600)}h ago`;
  } else if (differenceInSeconds < 2592000) {
    return `${Math.floor(differenceInSeconds / 86400)}d ago`;
  } else if (differenceInSeconds < 31536000) {
    return `${Math.floor(differenceInSeconds / 2592000)}mo ago`;
  } else {
    return `${Math.floor(differenceInSeconds / 31536000)}y ago`;
  }
};

// Handle successful and error toasts
export const showToast = (message, type = "success") => {
  toast[type](message, {
    closeOnClick: true,
  });
};
