import React, { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";
import Navbar from "./Navbar";

// TODO: fix type of session
interface LayoutProps {
  session: any;
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, session }) => {
  return (
    <>
      <Flex
        direction="column"
        alignItems="start"
        justifyContent="space-between"
        px={["1rem", "2rem"]}
        pb="1rem"
        w={["full", "full", "50%"]}
        border="1px lightgray solid"
        rounded="xl"
        fontFamily="sharpie"
      >
        <Navbar session={session} />
        {children}
      </Flex>
    </>
  );
};

export default Layout;
