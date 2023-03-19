import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react";
import HeadMetadata from "../components/HeadMetadata";
import { theme } from "../theme";
import { FormProvider } from "../context/FormContext";
import "@fontsource/inter";
import { Session } from "../types/Session";

interface AppProps {
  Component: any;
  pageProps: any;
  session: Session;
}

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        <HeadMetadata />
        <FormProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </FormProvider>
      </SessionProvider>
    </ChakraProvider>
  );
};

export default App;
