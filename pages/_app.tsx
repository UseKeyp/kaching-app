import { ChakraProvider, theme } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react";

import HeadMetadata from "components/HeadMetadata";

interface AppProps {
  Component: any;
  pageProps: any;
}

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        <HeadMetadata />
        <Layout session={session}>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ChakraProvider>
  );
};

export default App;
