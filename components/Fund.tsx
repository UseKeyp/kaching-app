import React from "react";
import { Box, Button, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { RxCopy } from "react-icons/rx";

const Fund = () => {
  return (
    <Box px="1rem" w="full">
      <Heading as="h3">
        <Text fontSize="32px" color="socialIconsGray">
          Fund your Wallet
        </Text>
      </Heading>
      <VStack spacing="1.5rem" mt="1.5rem">
        <Box w="full">
          <Button variant="ramps" color="#22272F">
            <Image src={"payment-ramp.svg"} alt="Ramp" />
          </Button>
        </Box>
        <Box w="full">
          <Button variant="ramps" color="#4A4D53">
            <Image src={"payment-coinbase.svg"} alt="" />
            <Text ml="1rem">Coinbase</Text>
          </Button>
        </Box>
        <Box w="full">
          <Button variant="ramps" color="formBlueDark">
            <RxCopy />
            <Text ml="1rem">Copy Address</Text>
          </Button>
        </Box>
      </VStack>
      <Box w="full" mt="3rem">
        <Button variant="form" color="formBlueDark">
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default Fund;
