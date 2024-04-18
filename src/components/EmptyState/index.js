import React from "react";
import styles from "./styles..module.scss";

const EmptyState = ({ title, text, backgroundColor, image, width = 200 }) => {
  return (
    <div
      className={styles.container}
      style={{ backgroundColor: backgroundColor }}
    >
      <h2>{title}</h2>
      <img width={width} src={image} alt="empty-state" />
      <p>{text}</p>
    </div>
  );
};

export default EmptyState;
