import React from "react";
import styles from "./styles.module.scss";
import Button from "../Button/Button";
import { useProducts } from "../../hooks/useProducts";
import Box from "../../components/Box";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const { name, description, price, image, product, isFavourite, index } =
    props;
  const {
    setSelectedProduct,
    handleAddProduct,
    handleAddFavourites,
    handleRemoveFavourites,
  } = useProducts();

  const navigate = useNavigate();

  const handleClick = () => {
    setSelectedProduct(product);
    navigate(`/produto/${product.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={styles.container}
      data-testid={`card.${index}`}
    >
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p title={description}>{description.slice(0, 100) + "..."}</p>
      <h1>R${price.toFixed(2).replace(".", ",")}</h1>
      <Box display="flex" flexDirection="column" gap="8px">
        <Button
          text="Adicionar ao carrinho"
          onClick={(e) => {
            handleAddProduct(product, e);
          }}
        />
        <Button
          backgroundColor={isFavourite ? "#ff6007d6" : "#eda17e"}
          text={
            isFavourite ? "Remover dos favoritos" : "Adicionar aos favoritos"
          }
          onClick={(e) => {
            isFavourite
              ? handleRemoveFavourites(product, e)
              : handleAddFavourites(product, e);
          }}
        />
      </Box>
    </div>
  );
};

export default Card;
