import React, { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { data: session } = useSession();
  console.log(session);

  return (
    <>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="space-between"
        mx="auto"
        px={["1rem", "2rem"]}
        pb="1rem"
        w={["full", "full", "60%"]}
        border="1px lightgray solid"
        rounded="xl"
        fontFamily="sharpie"
      >
        {children}
      </Flex>
    </>
  );
};

export default Layout;
