import React, { useEffect, useState } from "react";
import Card from "../../../../components/Card/Card";
import styles from "./styles.module.scss";
import { useProducts } from "../../../../hooks/useProducts";
import Input from "../../../../components/Input";
import EmptyState from "../../../../components/EmptyState";
import emptyState from "../../../../components/Icons/emptyState.svg";

const Products = () => {
  const { products, favouriteProducts } = useProducts();
  const [searchText, setSearchText] = useState("");
  const [showFavourites, setShowFavourites] = useState(false);
  const [renderedArr, setRenderedArray] = useState(products);

  const filteredProducts = renderedArr.filter(
    (item) =>
      searchText === "" ||
      item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    showFavourites
      ? setRenderedArray(favouriteProducts)
      : setRenderedArray(products);
  }, [showFavourites, products, favouriteProducts]);

  return (
    <div className={styles.wrapper}>
      <aside className={styles.left}>
        <Input
          value={searchText}
          type="text"
          placeholder="Busque pelo nome"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <h3
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSearchText("");
            setShowFavourites(false);
          }}
        >
          Todos
        </h3>
        <h3
          style={{ cursor: "pointer" }}
          onClick={() => setShowFavourites(true)}
        >
          Meus Favoritos
        </h3>
      </aside>

      <div className={styles.container}>
        <h1>{showFavourites ? "Meus favoritos" : "Todos"}</h1>
        <div className={styles.content}>
          {filteredProducts.length === 0 && (
            <EmptyState
              width="200"
              title="Nada aqui!"
              text="Adicione produtos aos favoritos para serem listados aqui :)"
              image={emptyState}
              backgroundColor="#ffffff"
            />
          )}
          {filteredProducts?.map((item) => {
            const isFavourite = favouriteProducts.some((f) => f.id === item.id);
            return (
              <Card
                key={item.id}
                name={item.name}
                description={item.description}
                price={item.value}
                image={item.image}
                product={item}
                isFavourite={isFavourite}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;
