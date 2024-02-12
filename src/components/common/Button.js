import React from "react";

import styles from "./Button.module.scss";

const Button = ({ children, disabled, onClick }) => {
  return (
    <button className={styles.button} disabled={disabled} onClick={onClick}>
      <div className="w-full flex justify-center">
        {children}
      </div>
      
    </button>
  );
};

export default Button;
