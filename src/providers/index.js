import React from "react";
import { OpenModalContextProvider } from "../context/openModalProvider";
import { ProductsProvider } from "../context/productsProvider";
import { SessionProvider } from "../context/sessionProvider";

const Providers = ({ children }) => {
  return (
    <SessionProvider>
      <ProductsProvider>
        <OpenModalContextProvider>{children}</OpenModalContextProvider>
      </ProductsProvider>
    </SessionProvider>
  );
};

export default Providers;
