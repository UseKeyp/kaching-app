import React, { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import HeadMetadata from "./HeadMetadata";
import Navbar from "./Navbar";

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
        px="0.5rem"
      >
        <Navbar />
        {children}
      </Box>
    </>
  );
};

export default Layout;
