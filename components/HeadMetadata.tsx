import Head from "next/head";

const HeadMetadata = () => {
  return (
    <Head>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content="Log in with Google or Discord to send crypto"
      />
      <title>Kaching</title>
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="preload"
        href="/fonts/sharpie/Sharpie-Extrabold.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
    </Head>
  );
};
export default HeadMetadata;
