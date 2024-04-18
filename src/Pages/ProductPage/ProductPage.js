import React from "react";
import { useProducts } from "../../hooks/useProducts";
import MainNav from "../../components/MainNav/MainNav";
import ShoppingCart from "../../components/ShoppingCart";
import { useOpener } from "../../hooks/useOpener";
import styles from "./styles.module.scss";
import Box from "../../components/Box";
import Button from "../../components/Button/Button";
import CartModal from "../Home/Sections/CartModal";
import ProductionNoteModal from "../Home/Sections/ProductionNote";
import { useNavigate } from "react-router-dom";
import LeftArrow from "../../components/Icons/LeftArrow";
const ProductPage = () => {
  const { selectedProduct, handleAddProduct, handleAddFavourites } =
    useProducts();
  const { openCartModal, openNoteModal, setOpenNoteModal } = useOpener();

  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      {!openCartModal && !openNoteModal && (
        <div className={styles.shoppingCart}>
          <ShoppingCart />
        </div>
      )}
      <MainNav />
      <div onClick={() => navigate(-1)} className={styles.backButton}>
        <LeftArrow />
        <span>Voltar</span>
      </div>
      <div className={styles.content}>
        <div className={styles.left}>
          <h1>{selectedProduct?.name}</h1>
          <h3 style={{ maxWidth: 500 }}>{selectedProduct?.description}</h3>
          <Box display="flex" gap="20px">
            <Button
              maxWidth={250}
              onClick={(e) => handleAddProduct(selectedProduct, e)}
              text="Adicionar ao carrinho"
            />
            <Button
              maxWidth={250}
              onClick={(e) => handleAddFavourites(selectedProduct, e)}
              text="Adicionar aos favoritos"
            />
          </Box>
        </div>

        <img src={selectedProduct?.image} alt={selectedProduct?.name} />
      </div>

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

export default ProductPage;
