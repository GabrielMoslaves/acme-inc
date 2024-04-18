import { useContext } from "react";
import { ProductsContext } from "../context/productsProvider";

export const useProducts = () => {
  const context = useContext(ProductsContext);

  return context;
};
