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
  removeProductFromCart: (product: IProductData) => void;
  getQuantity: () => number;
  getTotalPrice: () => number;
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
    const productExist = products.find((product) => product.name === name);
    const previousProducts = products.filter(
      (product) => product.name !== name
    );

    if (productExist) {
      productExist.quantity += quantity;
      setProducts([productExist, ...previousProducts]);
    } else {
      setProducts((prevProducts) => [
        { name, image, price, quantity },
        ...prevProducts
      ]);
    }
  };

  const removeProductFromCart = (product: IProductData) => {
    const updatedProducts = products.filter(
      (productData) => productData !== product
    );
    setProducts(updatedProducts);
  };

  const getQuantity = () => {
    return products.reduce(
      (prevProduct, product) => prevProduct + product.quantity,
      0
    );
  };

  const getTotalPrice = () => {
    return parseFloat(
      products
        .reduce(
          (prevProduct, product) =>
            prevProduct + product.quantity * product.price,
          0
        )
        .toFixed(2)
    );
  };

  return (
    <cartContext.Provider
      value={{
        products,
        addProductToCart,
        removeProductFromCart,
        getQuantity,
        getTotalPrice,
        isActive,
        setIsActive
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export { cartContext, CartProvider };
