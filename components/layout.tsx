import React, { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Flex
        direction="column"
        alignItems="start"
        justifyContent="space-between"
        px={["1rem", "2rem"]}
        pb="1rem"
        w="450px"
        fontFamily="sharpie"
      >
        {children}
      </Flex>
    </>
  );
};

export default Layout;
