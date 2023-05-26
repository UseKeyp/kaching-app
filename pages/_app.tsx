import React from "react";
import { useRouter } from "next/router";

import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layout";
import { SessionProvider } from "next-auth/react";
import { theme } from "../theme";
import { FormProvider } from "../context/FormContext";
import { SizeProvider } from "../context/SizeContext";
import Fonts from "../components/Fonts";
import "@fontsource/inter";
import Navbar from "components/Navbar";
import UserAccount from "components/UserAccount";
interface AppProps {
  Component: any;
  pageProps: any;
}

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const router = useRouter();

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <SessionProvider session={session}>
        <SizeProvider>
          <FormProvider>
            <Layout>
              {router.pathname !== "/login" ? (
                <>
                  <UserAccount />
                  <Component {...pageProps} />
                  <Navbar />
                </>
              ) : (
                <Component {...pageProps} />
              )}{" "}
            </Layout>
          </FormProvider>
        </SizeProvider>
      </SessionProvider>
    </ChakraProvider>
  );
};

export default App;
