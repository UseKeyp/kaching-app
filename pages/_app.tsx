import { SessionProvider } from "next-auth/react";

interface AppProps {
  Component: any;
  pageProps: any;
}

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
