import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface IProductData {
  name: string;
  details: string;
  images: IProductImage[];
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

const createCheckoutSession = async (items: IProductData[]) => {
  const stripe = await stripePromise;
  const checkoutSession = await axios.post("/api/createCheckoutSession", {
    items
  });

  const result = await stripe?.redirectToCheckout({
    sessionId: checkoutSession.data.id
  });

  if (result?.error) {
    console.error(result.error.message);
  }
};

export { createCheckoutSession };
