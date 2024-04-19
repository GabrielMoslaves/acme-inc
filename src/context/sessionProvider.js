import { createContext, useState } from "react";

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  const handleLogin = (session) => {
    debugger;
    setSession(session);
    localStorage.setItem("session", JSON.stringify(session));
  };

  const handleLogout = () => {
    setSession(null);
    localStorage.removeItem("session");
  };

  console.log("state session", session);
  return (
    <SessionContext.Provider
      value={{ session, setSession, handleLogin, handleLogout }}
    >
      {children}
    </SessionContext.Provider>
  );
};
