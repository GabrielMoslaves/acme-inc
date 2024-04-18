import styles from "./styles.module.scss";

const Header = () => {
  return (
    <div className={styles.container}>
      <img
        src="background.png"
        className={styles.backgroundImage}
        alt="banner"
      />
    </div>
  );
};

export default Header;
