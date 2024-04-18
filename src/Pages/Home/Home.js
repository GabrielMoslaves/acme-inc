import React from "react";
import styles from "./styles.module.scss";
import ShoppingCart from "../../components/ShoppingCart";
import Header from "../Home/Sections/Header/Header";
import Products from "../Home/Sections/Products/Products";
import About from "../Home/Sections/About/About";
import CartModal from "../Home/Sections/CartModal";
import { useOpener } from "../../hooks/useOpener";
import ProductionNoteModal from "./Sections/ProductionNote";
import MainNav from "../../components/MainNav/MainNav";

const Home = () => {
  const { openCartModal, openNoteModal, setOpenNoteModal } = useOpener();

  return (
    <div className={styles.container}>
      {!openCartModal && !openNoteModal && (
        <div className={styles.shoppingCart}>
          <ShoppingCart />
        </div>
      )}
      <MainNav />
      <Header />
      <Products />
      <About />
      {openCartModal && <CartModal />}
      {openNoteModal && (
        <ProductionNoteModal
          openNoteModal={openNoteModal}
          setOpenNoteModal={setOpenNoteModal}
        />
      )}
    </div>
  );
};

export default Home;
