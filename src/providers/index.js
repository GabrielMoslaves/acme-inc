import React from "react";
import { OpenModalContextProvider } from "../context/openModalProvider";
import { ProductsProvider } from "../context/productsProvider";

const Providers = ({ children }) => {
  return (
    <ProductsProvider>
      <OpenModalContextProvider>{children}</OpenModalContextProvider>
    </ProductsProvider>
  );
};

export default Providers;
