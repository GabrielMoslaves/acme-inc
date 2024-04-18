import React from "react";
import styles from "./styles.module.scss";

const About = () => {
  return (
    <div className={styles.container}>
      <img
        style={{ borderRadius: "8px", width: "550px", height: "501px" }}
        src="./acme-footer.jpg"
        alt="sobre"
      />

      <div className={styles.right}>
        <h1>Sobre a ACME INC</h1>
        <p className={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis
          justo sem. Donec consequat, nunc a dapibus dapibus, justo dolor
          tristique tortor, sit amet tincidunt lorem nisl at ex. Cras dolor
          purus, varius in euismod pretium, finibus nec mi. Curabitur aliquam
          pharetra lectus in pharetra. Nullam viverra elementum neque quis
          fermentum.
        </p>
      </div>
    </div>
  );
};

export default About;
