import React from "react";

const Button = ({ children, disbaled, onClick, ...props }) => {
  return (
    <button className="btn" disabled={disbaled} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
