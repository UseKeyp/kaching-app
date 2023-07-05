import React, { ReactNode, useRef } from "react";
import { Box } from "@chakra-ui/react";
import HeadMetadata from "./HeadMetadata";
import ScrollableElementContext from "context/ScrollableElementContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const scrollableElementRef = useRef(null);
  return (
    <>
      <HeadMetadata />
      <Box
        alignItems="start"
        maxW="100%"
        maxH="100vh"
        fontSize="1rem"
        fontFamily="satoshi"
        overflowY="auto"
        overflowX="hidden"
        ref={scrollableElementRef}
      >
        <ScrollableElementContext.Provider value={scrollableElementRef}>
          {children}
        </ScrollableElementContext.Provider>
      </Box>
    </>
  );
};

export default Layout;
