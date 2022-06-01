import { useState } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { client, urlFor } from "../../lib/sanityClient";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Header from "../../components/Header";

import styles from "./index.module.css";

interface IProductData {
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

interface IProductProps {
  productDetails: IProductData;
  products: IProductData[];
}

const Product: NextPage<IProductProps> = ({ productDetails, products }) => {
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <div className={styles.container}>
      <Header />
      <main>
        <section className={styles.imagesContainer}>
          <div className={styles.bigImage}>
            <div>
              <Image
                src={urlFor(productDetails.images[imageIndex]).url()}
                alt={`${productDetails.name} ${imageIndex + 1}`}
                width={300}
                height={300}
              />
            </div>
          </div>
          <div className={styles.smallImages}>
            {productDetails.images.map((image, index) => (
              <div
                key={index}
                style={
                  index === imageIndex
                    ? { backgroundColor: "var(--color-brown" }
                    : {}
                }
                onClick={() => setImageIndex(index)}
              >
                <Image
                  src={urlFor(image).url()}
                  alt={`${productDetails.name} ${index + 1}`}
                  width={50}
                  height={50}
                />
              </div>
            ))}
          </div>
        </section>
        <section className={styles.infoContainer}>
          <h2>{productDetails.name}</h2>
          <article>
            <h3>Details: </h3>
            <p>{productDetails.details}</p>
          </article>
          <p className={styles.price}>${productDetails.price}</p>
          <div className={styles.quantity}>
            <h3>Quantity:</h3>
            <p>
              <span>
                <AiOutlineMinus />
              </span>
              <span>0</span>
              <span>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className={styles.actionsContainer}>
            <button>Buy Now</button>
            <button>Add To Cart</button>
          </div>
        </section>
      </main>
      <section className={styles.productsContainer}>
        <h2>Other Products you may like</h2>
        <div className={styles.productCards}>
          {products.map(
            (product) =>
              product._id !== productDetails._id && (
                <Link
                  href={`/product/${product.slug.current}`}
                  key={product._id}
                >
                  <div>
                    <section>
                      <Image
                        src={urlFor(product.images[0]).url()}
                        alt={product.name}
                        width={200}
                        height={200}
                      />
                    </section>
                    <section>
                      <p>{product.name}</p>
                      <p>${product.price}</p>
                    </section>
                  </div>
                </Link>
              )
          )}
        </div>
      </section>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products.map((product: any) => ({
    params: {
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({
  params: { slug }
}: any) => {
  const productQuery = `*[_type == "product" && slug.current == "${slug}"][0]`;
  const productDetails = await client.fetch(productQuery);

  const productsQuery = '*[_type == "product"]';
  const products = await client.fetch(productsQuery);

  return { props: { productDetails, products } };
};

export default Product;
