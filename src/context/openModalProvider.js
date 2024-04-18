import { createContext, useState } from "react";

export const OpenModalContext = createContext();

export const OpenModalContextProvider = ({ children }) => {
  const [openCartModal, setOpenCartModal] = useState(false);
  const [openNoteModal, setOpenNoteModal] = useState(false);

  return (
    <OpenModalContext.Provider
      value={{ openCartModal, setOpenCartModal, openNoteModal, setOpenNoteModal }}
    >
      {children}
    </OpenModalContext.Provider>
  );
};
