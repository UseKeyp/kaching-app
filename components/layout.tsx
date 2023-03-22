import React, { ReactNode } from "react";
import { Box, Flex } from "@chakra-ui/react";
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
        px="1rem"
        h="100vh"
        // h="100%"
      >
        <Navbar />
        {children}
      </Box>
    </>
  );
};

export default Layout;
