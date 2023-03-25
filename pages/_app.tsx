import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layout";
import { SessionProvider } from "next-auth/react";
import { theme } from "../theme";
import { FormProvider } from "../context/FormContext";
import { SizeProvider } from "../context/SizeContext";
import Fonts from "../components/Fonts";
import "@fontsource/inter";
// import localFont from "@next/font/local";

// const sharpie = localFont({
//   src: [
//     {
//       path: "../public/fonts/sharpie/Sharpie-Regular.woff2",
//       weight: "400",
//     },
//     {
//       path: "../public/fonts/sharpie/Sharpie-Extrabold.woff2",
//       weight: "800",
//     },
//   ],
//   preload: true,
//   display: "swap",
// });

interface AppProps {
  Component: any;
  pageProps: any;
}

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <SessionProvider session={session}>
        <SizeProvider>
          <FormProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </FormProvider>
        </SizeProvider>
      </SessionProvider>
    </ChakraProvider>
  );
};

export default App;
