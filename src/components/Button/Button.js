import styles from "./styles.module.scss";

const Button = ({ text, backgroundColor, maxWidth, ...rest }) => {
  return (
    <button
      className={styles.container}
      {...rest}
      style={{ backgroundColor: backgroundColor, maxWidth: maxWidth }}
    >
      {text}
    </button>
  );
};

export default Button;
