import React, { ReactNode } from "react";
import { Flex, VStack } from "@chakra-ui/react";
import HeadMetadata from "./HeadMetadata";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <HeadMetadata />
      <VStack
        alignItems="start"
        px={["0.5rem", "1rem"]}
        pb="1rem"
        fontSize="60px"
        fontWeight="extrabold"
        fontFamily="sharpie"
        border="4px solid red"
        // w="100vh"
      >
        {children}
      </VStack>
    </div>
  );
};

export default Layout;
