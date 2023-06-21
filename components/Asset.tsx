import { Box, Heading } from "@chakra-ui/react";
import { useFormContext } from "context/FormContext";
import React from "react";
import Balances from "./Balances";

const Asset = ({goToStep}: { goToStep?: any }) => {
  const { setAsset } = useFormContext();

  const handleClick = (token: string) => {
    console.log({token})
    setAsset(token)
    goToStep(3)
    return
  };
  return (
    <Box>
      <Heading
        as="h2"
        fontWeight="700"
        fontSize="40px"
        color="#33912E"
        textTransform="capitalize"
        mb="40px"
      >
        Asset
      </Heading>
      <Box bg="rgba(255, 255, 255, 0.8)" borderRadius="8px" width="100%">
        <Balances onClick={handleClick} />
      </Box>
    </Box>
  );
};

export default Asset;
