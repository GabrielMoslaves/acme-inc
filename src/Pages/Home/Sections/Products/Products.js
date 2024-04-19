import React, { useState } from "react";
import Card from "../../../../components/Card/Card";
import styles from "./styles.module.scss";
import { useProducts } from "../../../../hooks/useProducts";
import Input from "../../../../components/Input";
import EmptyState from "../../../../components/EmptyState";
import emptyState from "../../../../components/Icons/emptyState.svg";
import { useLocation, useNavigate } from "react-router-dom";

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { products, favouriteProducts, loading } = useProducts();
  const [searchText, setSearchText] = useState("");

  const showFavourites = location.search.includes("favoritos=true");

  const renderedArr = showFavourites ? favouriteProducts : products;

  const filteredProducts = renderedArr.filter(
    (item) =>
      searchText === "" ||
      item.name.toLowerCase().includes(searchText.toLowerCase())
  );

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
          style={{
            cursor: "pointer",
            color: !showFavourites ? "red" : undefined,
          }}
          onClick={() => {
            setSearchText("");
            navigate("/");
          }}
        >
          Todos
        </h3>
        <h3
          style={{
            cursor: "pointer",
            color: showFavourites ? "red" : undefined,
          }}
          onClick={() => navigate("/?favoritos=true")}
        >
          Meus Favoritos
        </h3>
      </aside>

      <div className={styles.container}>
        <h1>{showFavourites ? "Meus favoritos" : "Todos"}</h1>
        <div className={styles.content}>
          {loading && <h2>Carregando...</h2>}
          {filteredProducts.length === 0 && !loading && (
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
