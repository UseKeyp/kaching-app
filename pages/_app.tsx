import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react";
import HeadMetadata from "components/HeadMetadata";
import { theme } from "theme";
import { FormProvider } from "context/FormContext";
interface AppProps {
  Component: any;
  pageProps: any;
}

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        <HeadMetadata />
        <FormProvider>
          <Layout session={session}>
            <Component {...pageProps} />
          </Layout>
        </FormProvider>
      </SessionProvider>
    </ChakraProvider>
  );
};

export default App;
