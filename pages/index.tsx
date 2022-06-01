import type { GetServerSideProps, NextPage } from "next";

import { client } from "../lib/sanityClient";

import Header from "../components/Header";
import HeroBanner from "../components/HeroBanner";
import Products from "../components/Products";

interface IBannerData {
  _id: string;
  product: string;
  productImage: IProductImage;
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

interface IHomeProps {
  bannerData: IBannerData[];
  productData: IProductData[];
}

const Home: NextPage<IHomeProps> = ({ bannerData, productData }) => {
  return (
    <div>
      <section>
        <Header />
        <HeroBanner data={bannerData} />
      </section>
      <section>
        <Products data={productData} />
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  const productQuery = '*[_type == "product"]';
  const productData = await client.fetch(productQuery);

  return {
    props: { bannerData, productData }
  };
};

export default Home;
