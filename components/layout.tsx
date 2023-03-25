import React, { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import HeadMetadata from "./HeadMetadata";
import localFont from "@next/font/local";

export const sharpie = localFont({
  src: [
    {
      path: "../public/fonts/sharpie/Sharpie-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/sharpie/Sharpie-Extrabold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
});

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <HeadMetadata />
      <Box
        alignItems="start"
        maxW="100vw"
        maxH="100vh"
        pb="1rem"
        fontSize="1rem"
        fontWeight="extrabold"
        fontFamily="Sharpie"
        px="1rem"
        h="100vh"
        overflowY="auto"
      >
        {children}
      </Box>
    </>
  );
};

export default Layout;
