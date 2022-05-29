import Image from "next/image";
import { urlFor } from "../../lib/sanityClient";

import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

import BannerBg from "/public/assets/banner-bg.jpg";

import styles from "./index.module.css";

interface IBannerData {
  _id: string;
  product: string;
  productImage: unknown;
  buttonText: string;
  smallText?: string;
  midText?: string;
  largeText?: string;
  discount?: string;
  discountTime?: string;
  productSlug: { current: string };
  _createdAt: string;
  _updatedAt: string;
}

interface IHeroBannerProps {
  data: IBannerData;
  dataLength: number;
  position: number;
  setPosition: React.Dispatch<React.SetStateAction<number>>;
}

const HeroBanner = ({
  data,
  dataLength,
  position,
  setPosition
}: IHeroBannerProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.bannerNavigation}>
        {position > 0 && (
          <BsArrowLeftCircle
            className={styles.leftArrow}
            onClick={() => setPosition(position - 1)}
          />
        )}
        {position < dataLength - 1 && (
          <BsArrowRightCircle
            className={styles.rightArrow}
            onClick={() => setPosition(position + 1)}
          />
        )}
      </div>
      <Image
        src={BannerBg}
        alt="Banner"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        priority={true}
        placeholder={"blur"}
      />
      <main>
        <section className={styles.bannerInfoContainer}>
          <p>{data.smallText}</p>
          <h2>{data.midText}</h2>
          <h1>{data.largeText}</h1>
          <div>
            <h2>{data.discount}</h2>
            <span>{data.discountTime}</span>
          </div>
          <button>{data.buttonText}</button>
        </section>
        <section className={styles.productImageContainer}>
          <Image
            src={urlFor(data.productImage).url()}
            alt={data.product}
            width={200}
            height={200}
            layout="responsive"
          />
        </section>
      </main>
    </div>
  );
};

export default HeroBanner;
