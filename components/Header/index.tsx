import Image from "next/image";
import Link from "next/link";

import { FaShoppingCart } from "react-icons/fa";
import Logo from "/public/assets/logo.svg";

import styles from "./index.module.css";

const Header = () => (
  <header className={styles.container}>
    <section className={styles.logoContainer}>
      <Link href="/">
        <a>
          <Image src={Logo} alt="Logo" width={60} height={60} />
          <h1>Coffee Store</h1>
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
