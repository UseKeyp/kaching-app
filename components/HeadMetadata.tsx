import Head from "next/head";

const HeadMetadata = () => {
  return (
    <Head>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content="Log in with Google, Discord or Chess and send cryptocurrency"
      />
      <link rel="icon" href="/favicon.ico" />
      <link
        href="fonts/sharpie/Sharpie-Variable.woff2"
        rel="preload"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <title>Ka-ching</title>
    </Head>
  );
};
export default HeadMetadata;
