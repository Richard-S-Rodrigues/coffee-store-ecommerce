import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { cartContext } from "../../contexts/CartContext";
import { urlFor } from "../../lib/sanityClient";

import styles from "./index.module.css";

interface IData {
  _id: string;
  name: string;
  images: IProductImage[];
  details: string;
  price: number;
  slug: {
    current: string;
  };
  _createdAt: string;
  _updatedAt: string;
}

interface IProductImage {
  asset: {
    _ref: string;
  };
  options?: {
    hotspot?: boolean;
  };
}

interface IProductsProps {
  data: IData[];
}

const Products = ({ data }: IProductsProps) => {
  const { addProductToCart } = useContext(cartContext);

  return (
    <div className={styles.container}>
      {data.length > 0 &&
        data.map(({ _id, name, details, images, price, slug }) => (
          <div key={_id}>
            <section className={styles.imageContainer}>
              <Image
                src={urlFor(images[0]).url()}
                alt={name}
                width={200}
                height={200}
              />
            </section>
            <section className={styles.infoContainer}>
              <p>{name}</p>
              <p>${price}</p>
            </section>
            <section className={styles.actionsContainer}>
              <Link href={`/product/${slug?.current}`}>More</Link>
              <button
                onClick={() =>
                  addProductToCart(name, details, images, price, 1)
                }
              >
                Add To Cart
              </button>
            </section>
          </div>
        ))}
    </div>
  );
};

export default Products;
