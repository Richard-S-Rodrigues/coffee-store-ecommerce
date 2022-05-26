import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = sanityClient({
  projectId: "6g3zzchh",
  dataset: "production",
  apiVersion: "2022-05-25",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

const urlFor = (source: any) => builder.image(source);

export { client, urlFor };
