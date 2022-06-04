import Image from "next/image";
import { useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { cartContext } from "../../contexts/CartContext";
import { urlFor } from "../../lib/sanityClient";
import { BiArrowBack } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";

import styles from "./index.module.css";

const Cart = () => {
  const { products, getQuantity, getTotalPrice, isActive, setIsActive } =
    useContext(cartContext);

  useEffect(() => {
    console.log(products);
  }, [products]);
  return (
    <div
      className={styles.container}
      style={!isActive ? { display: "none" } : {}}
    >
      <div>
        <main>
          <section className={styles.titleContainer}>
            <h2>Your cart. ({getQuantity()} items)</h2>
            <BiArrowBack onClick={() => setIsActive(false)} cursor="pointer" />
          </section>
          <section className={styles.itemsContainer}>
            {!products.length ? (
              <div>Shopping Cart Empty</div>
            ) : (
              <ul>
                {products.map(({ name, image, price, quantity }) => (
                  <li key={uuidv4()}>
                    <div className={styles.itemInfo}>
                      <div className={styles.itemImageContainer}>
                        <Image
                          src={urlFor(image).url()}
                          alt={`Product: ${name}`}
                          width={60}
                          height={60}
                        />
                      </div>
                      <div className={styles.itemDetailsContainer}>
                        <p>{name}</p>
                        <p>
                          ${price}{" "}
                          <span className={styles.quantity}>x {quantity}</span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <FaTrashAlt color="#9c0207" cursor="pointer" />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section className={styles.totalContainer}>
            <div>
              <span className={styles.total}>Total: </span>
              <span className={styles.price}>${getTotalPrice()}</span>
            </div>
            <button>Pay With Stripe</button>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Cart;
