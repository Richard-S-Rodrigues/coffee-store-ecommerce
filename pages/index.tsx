import type { NextPage } from "next";
import { client } from "../lib/sanityClient";

import Header from "../components/Header";
import HeroBanner from "../components/HeroBanner";

interface IBannerData {
  _id: string;
  product: string;
  image: unknown;
  buttonText: string;
  smallText?: string;
  midText?: string;
  largeText1?: string;
  largeText2?: string;
  discount?: string;
  discountTime?: string;
  productSlug: { _type: string; current: string };
  _createdAt: string;
  _updatedAt: string;
}

interface IProductData {
  _id: string;
  name: string;
  image: unknown;
  details: string;
  price: number;
  slug: {
    _type: string;
    current: string;
  };
  _createdAt: string;
  _updatedAt: string;
}

interface IHomeProps {
  bannerData: IBannerData[];
  productData: IProductData[];
}

const Home: NextPage<IHomeProps> = ({ bannerData, productData }) => {
  return (
    <div>
      <Header />
      <HeroBanner />
    </div>
  );
};

export const getServerSideProps = async () => {
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  const productQuery = '*[_type == "product"]';
  const productData = await client.fetch(productQuery);

  return {
    props: { bannerData, productData }
  };
};

export default Home;
