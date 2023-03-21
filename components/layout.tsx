import React, { ReactNode } from "react";
import { Box, VStack } from "@chakra-ui/react";
import HeadMetadata from "./HeadMetadata";

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
        fontFamily="sharpie"
      >
        {children}
      </Box>
    </>
  );
};

export default Layout;
