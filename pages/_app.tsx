import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layout";
import { SessionProvider } from "next-auth/react";
import HeadMetadata from "../components/HeadMetadata";
import { theme } from "../theme";
import { FormProvider } from "../context/FormContext";
import Fonts from "../components/Fonts";
import "@fontsource/inter";

interface AppProps {
  Component: any;
  pageProps: any;
}

console.log(Fonts);

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        <HeadMetadata />
        <FormProvider>
          <Fonts />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </FormProvider>
      </SessionProvider>
    </ChakraProvider>
  );
};

export default App;
