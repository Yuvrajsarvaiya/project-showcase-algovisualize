import React from "react";

import styles from "./button.module.css";

const Button = ({ children, disbaled, onClick, className, ...props }) => {
  return (
    <button
      className={styles.btn}
      disabled={disbaled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
