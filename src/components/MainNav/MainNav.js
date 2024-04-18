import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import Box from "../Box";

const MainNav = () => {
  const session = JSON.parse(localStorage.getItem("session"));

  const signOut = () => {
    localStorage.removeItem("session");
  };

  return (
    <div className={styles.container}>
      <div>
        <img src="/Acme-corp.png" alt="logo" />
      </div>
      <Box display="flex" alignItems="center" gap="20px">
        {session && <span>{session.email}</span>}
        <Link
          className={styles.link}
          onClick={session ? signOut : ""}
          to="/login"
        >
          <h3> {session ? "Logout" : "Entrar"}</h3>
        </Link>
      </Box>
    </div>
  );
};

export default MainNav;
