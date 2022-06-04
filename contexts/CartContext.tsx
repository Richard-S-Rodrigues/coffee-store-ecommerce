import { createContext, ReactNode, SetStateAction, useState } from "react";

interface IProductData {
  name: string;
  image: IProductImage;
  price: number;
  quantity: number;
}

interface IProductImage {
  asset: {
    _ref: string;
  };
  options?: {
    hotspot?: boolean;
  };
}

interface ICartData {
  products: IProductData[];
  addProductToCart: (
    name: string,
    image: IProductImage,
    price: number,
    quantity: number
  ) => void;
  isActive: boolean;
  setIsActive: React.Dispatch<SetStateAction<boolean>>;
}

interface ICartProviderProps {
  children: ReactNode;
}

const cartContext = createContext({} as ICartData);

const CartProvider = ({ children }: ICartProviderProps) => {
  const [isActive, setIsActive] = useState(false);
  const [products, setProducts] = useState([] as IProductData[]);

  const addProductToCart = (
    name: string,
    image: IProductImage,
    price: number,
    quantity: number
  ) => {
    setProducts((previousProducts) => [
      { name, image, price, quantity },
      ...previousProducts
    ]);
  };

  return (
    <cartContext.Provider
      value={{ products, addProductToCart, isActive, setIsActive }}
    >
      {children}
    </cartContext.Provider>
  );
};

export { cartContext, CartProvider };
