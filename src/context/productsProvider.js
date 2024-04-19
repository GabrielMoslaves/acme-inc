import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createContext } from "react";
import toast from "react-hot-toast";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [paymentForm, setPaymentForm] = useState("");
  const [change, setChange] = useState(0);
  const [favouriteProducts, setFavouriteProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [nouns, setNouns] = useState([]);
  const [adjectives, setAdjectives] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchWords() {
      try {
        const { data } = await axios.get("https://acme-inc.mock/random-words");
        setNouns(data.nouns);
        setAdjectives(data.adjectives);
      } catch (e) {
        console.log(e);
      }
    }

    fetchWords();
  }, []);

  const session = JSON.parse(localStorage.getItem("session"));

  const selectedIds = selectedProducts?.map((item) => item.id);

  const parsedSelectedProducts = selectedProducts.map((item) => {
    return { ...item, totalItemPrice: item.qtd * item.value };
  });

  const totalPrice = parsedSelectedProducts.reduce(
    (accumulator, item) => accumulator + item.totalItemPrice,
    0
  );

  const nounsCopy = useMemo(() => [...nouns], [nouns]);
  const adjectivesCopy = useMemo(() => [...adjectives], [adjectives]);

  const getRandomUniqueItem = useCallback((array) => {
    const index = Math.floor(Math.random() * array.length);
    const item = array.splice(index, 1)[0];
    return item;
  }, []);

  const imagesResolution = (url) => {
    let split = url.split("/");

    split[split.length - 1] = 292;
    split[split.length - 2] = 438;

    return split.join("/");
  };

  const createRandomObject = useCallback(
    (id) => {
      const randomNoun = getRandomUniqueItem(nounsCopy);
      const randomAdjective = getRandomUniqueItem(adjectivesCopy);
      const productName = `${randomNoun} ${randomAdjective}`;
      const nameLength = productName.split(" ").length;
      const productDescription =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae consectetur velit. Curabitur auctor urna magna, varius vehicula augue dapibus sed. Morbi ultricies volutpat lorem ut scelerisque. In feugiat, diam id luctus dapibus, lectus libero egestas leo, eu lobortis ex orci a est.";
      return {
        id: id,
        name: productName,
        description: productDescription,
        value:
          10 +
          productName.length *
            ((500 - productDescription.length) / (4 - Math.min(nameLength, 3))),
        qtd: 1,
      };
    },
    [adjectivesCopy, getRandomUniqueItem, nounsCopy]
  );

  const objects = useMemo(() => {
    const objects = [];
    for (let i = 0; i < 30; i++) {
      objects.push(createRandomObject(i + 1));
    }

    return objects;
  }, [createRandomObject]);

  const getImages = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("https://picsum.photos/v2/list");
      const products = objects.map((item, index) => ({
        ...item,
        image: imagesResolution(data[index].download_url),
      }));
      setProducts(products);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [objects]);

  useEffect(() => {
    getImages();
  }, [getImages]);

  const handleAddProduct = (product, e) => {
    e.stopPropagation();
    if (selectedIds?.includes(product.id)) {
      setSelectedProducts((prevState) => {
        const updatedList = prevState.map((item) => {
          if (item.id === product.id) {
            return { ...item, qtd: item.qtd + 1 };
          } else {
            return item;
          }
        });
        return updatedList;
      });
    } else {
      setSelectedProducts((prevState) => [...prevState, product]);
    }
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 500);
      }),
      {
        loading: "Adicionando ao carrinho...",
        success: <b>Adicionado!</b>,
      }
    );
  };

  console.log({ session });
  const handleAddFavourites = (product, e) => {
    e.stopPropagation();
    if (favouriteProducts.some((item) => item.id === product.id)) {
      return;
    } else if (session) {
      setFavouriteProducts((prevState) => [...prevState, product]);
      toast.promise(
        new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 500);
        }),
        {
          loading: "Adicionando aos favoritos...",
          success: <b>Adicionado!</b>,
        }
      );
    } else {
      toast.error("Efetue login para adicionar produtos aos favoritos");
    }
  };

  const handleRemoveFavourites = (product, e) => {
    e.stopPropagation();
    setFavouriteProducts((prevState) =>
      prevState.filter((item) => item.id !== product.id)
    );
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 500);
      }),
      {
        loading: "Removendo...",
        success: <b>Removido!</b>,
      }
    );
  };

  return (
    <ProductsContext.Provider
      value={{
        loading,
        handleAddProduct,
        handleAddFavourites,
        handleRemoveFavourites,
        setSelectedProduct,
        selectedProduct,
        setFavouriteProducts,
        favouriteProducts,
        products,
        selectedProducts,
        setSelectedProducts,
        paymentForm,
        setPaymentForm,
        change,
        setChange,
        parsedSelectedProducts,
        totalPrice,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
