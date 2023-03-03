import Head from "next/head";

const HeadMetadata = () => {
  return (
    <Head>
      <title>Ka-ching</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content="Log in with Google, Discord or Chess and send cryptocurrency"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
export default HeadMetadata;
