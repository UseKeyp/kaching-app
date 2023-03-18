import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import Navbar from "components/Navbar";
import { useFormContext } from "context/FormContext";
import { useRouter } from "next/router";
import React from "react";

interface ConfirmationProps {
  amount: number;
  asset: string;
  username: string;
}

const Confirmation = () => {
  const router = useRouter();
  console.log(router);
  return (
    <>
      <Navbar />
      <Box>
        <VStack w="450px">
          <Heading as="h1" fontSize="120px">
            Ka-ching
          </Heading>
          <Box>
            <Text>{/* {amount}asset{asset} */}</Text>
          </Box>
          <Box>
            <Text>Sent to</Text>
          </Box>
          <Box>{/* <Text>{username}</Text> */}</Box>
        </VStack>
        <VStack></VStack>
      </Box>
    </>
  );
};

export default Confirmation;
