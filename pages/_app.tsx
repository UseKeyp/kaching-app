import { ChakraProvider, theme } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react";
import Navbar from "components/Navbar";

interface AppProps {
  Component: any;
  pageProps: any;
}

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  console.log(session);

  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        <Layout session={session}>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ChakraProvider>
  );
};

export default App;
