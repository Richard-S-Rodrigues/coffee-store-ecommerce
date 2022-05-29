import Link from "next/link";

import { FaShoppingCart } from "react-icons/fa";

import styles from "./index.module.css";

const Header = () => (
  <header className={styles.container}>
    <section className={styles.logoContainer}>
      <Link href="/">
        <a>
          <h1>
            Coffee{" "}
            <span style={{ color: "var(--color-light-brown" }}>Store</span>
          </h1>
        </a>
      </Link>
    </section>
    <section className={styles.shoppingCartContainer}>
      <Link href="/cart">
        <a>
          <FaShoppingCart size={35} />
          <div>
            <span>Shopping cart</span>
            <br />
            <span>0 items</span>
          </div>
        </a>
      </Link>
    </section>
  </header>
);

export default Header;
