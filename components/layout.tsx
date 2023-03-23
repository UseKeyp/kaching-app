import React, { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import HeadMetadata from "./HeadMetadata";
import { useSession } from "next-auth/react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { data: session } = useSession();

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
