import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import Box from "../Box";
import { useSession } from "../../hooks/useSession";

const MainNav = () => {
  const { session, handleLogout } = useSession();

  return (
    <div className={styles.container}>
      <div>
        <img src="/Acme-corp.png" alt="logo" />
      </div>
      <Box display="flex" alignItems="center" gap="20px">
        {session && <span>{session.email}</span>}
        <Link
          className={styles.link}
          onClick={() => session && handleLogout()}
          to="/login"
        >
          <h3> {session ? "Logout" : "Entrar"}</h3>
        </Link>
      </Box>
    </div>
  );
};

export default MainNav;
