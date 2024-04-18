import styles from "./styles.module.scss";
import { useOpener } from "../../hooks/useOpener";

const ShoppingCart = () => {
  const { setOpenCartModal } = useOpener();
  return (
    <div
      onClick={() => setOpenCartModal(true)}
      className={styles.container}
    >
      <img
        alt="carrinho"
        className={styles.img}
        src="/carrinho.png"
      />
    </div>
  );
};

export default ShoppingCart;
