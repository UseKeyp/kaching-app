import { Box } from "@chakra-ui/react";
import Heading from "components/Navbar";
import React, { ReactNode } from "react";

interface HomeProps {
  children: ReactNode;
}
const Home: React.FC<HomeProps> = ({ children }) => {
  return (
    <>
      <Box>
        <Heading />
      </Box>
      {children}
    </>
  );
};

export default Home;
