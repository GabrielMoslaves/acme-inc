import { useContext } from "react";
import { OpenModalContext } from "../context/openModalProvider";

export const useOpener = () => {
  const context = useContext(OpenModalContext);

  return context;
};
