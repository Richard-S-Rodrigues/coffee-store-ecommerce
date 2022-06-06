import { NextApiRequest, NextApiResponse } from "next";
import { urlFor } from "../../../lib/sanityClient";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { items } = req.body;

  const transformedItems = items.map((item: any) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          images: item.images.map((image: any) => urlFor(image).url()),
          name: item.name
        },
        unit_amount: item.price * 100 // convert to integer
      },
      description: item.details,
      quantity: item.quantity
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: transformedItems,
      mode: "payment",
      success_url: `${req.headers.origin}/?success=true`,
      cancel_url: `${req.headers.origin}/?canceled=true`
    });

    return res.json({ id: session.id });
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
}
