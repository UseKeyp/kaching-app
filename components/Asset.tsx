import { Box, Flex, Heading } from "@chakra-ui/react";
import { useFormContext } from "context/FormContext";
import React from "react";
import AssetsBtnsList from "./AssetsBtnsList";

const Asset = ({ goToStep }: { goToStep?: any }) => {
  const { setAsset } = useFormContext();

  const handleClick = (token: string) => {
    setAsset(token);
    goToStep(3);
    return;
  };

  return (
    <Box overflow="hidden" width="343px" mx="auto">
      <Heading
        as="h2"
        fontWeight="700"
        fontSize="40px"
        color="#33912E"
        textTransform="capitalize"
        mb="30px"
      >
        Asset
      </Heading>
      <Flex width="100%" overflow="hidden" flexDirection="column" gap="24px">
        <AssetsBtnsList onClick={handleClick}/>
      </Flex>
    </Box>
  );
};

export default Asset;
