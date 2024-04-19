import { useContext } from "react";
import { SessionContext } from "../context/sessionProvider";

export const useSession = () => {
  const context = useContext(SessionContext);

  return context;
};
