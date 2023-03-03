import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react";
import HeadMetadata from "components/HeadMetadata";
import { theme } from "theme";

interface AppProps {
  Component: any;
  pageProps: any;
}
console.log(theme);

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
