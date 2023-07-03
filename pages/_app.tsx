import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Box, ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layout";
import { SessionProvider } from "next-auth/react";
import { theme } from "../theme";
import { FormProvider } from "../context/FormContext";
import { SizeProvider } from "../context/SizeContext";
import Fonts from "../components/Fonts";
import "@fontsource/inter";
import Navbar from "components/Navbar";
import UserAccount from "components/UserAccount";
import "public/fonts/satoshi/css/satoshi.css";
import { BalanceProvider } from "../context/BalanceContext";
import { BackgroundImage } from "components/BackgroundImage";

interface AppProps {
  Component: any;
  pageProps: any;
}

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const router = useRouter();

  const getBackground = () => {
    switch (router.pathname) {
      case "/send":
      case "/transaction-success":
        return "url('/bg-green.jpg')";
      case "/play":
        return "url('/bg-grey.jpg')";
      case "/ramp":
      case "/wallet":
      case "/":
      case "/account":
        return "url('/bg-blue.jpg')";
      case "/apps":
        return "url('/bg-yellow.jpg')";
      default:
        return "url('/bg-color.jpg')";
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <SessionProvider session={session}>
        <SizeProvider>
          <FormProvider>
            <BalanceProvider>
              <BackgroundImage image={getBackground()} minH="100vh" opacity={0.7}>
                <Layout>
                  {router.pathname !== "/login" ? (
                    <>
                      <UserAccount />
                      <Box paddingTop="80px" paddingBottom="140px">
                        <Component {...pageProps} />
                      </Box>
                      <Navbar />
                    </>
                  ) : (
                    <Component {...pageProps} />
                  )}{" "}
                </Layout>
              </BackgroundImage>
            </BalanceProvider>
          </FormProvider>
        </SizeProvider>
      </SessionProvider>
    </ChakraProvider>
  );
};

export default App;
