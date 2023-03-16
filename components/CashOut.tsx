import React from "react";
import { Box, Button, Heading, Image, Text, VStack } from "@chakra-ui/react";
import UseApi from "../hooks/useApi";
import { useSession } from "next-auth/react";

const CashOut = () => {
  const { data: session } = useSession();

  const handleClickCashOut = async (rampType: string) => {
    const request = await UseApi(
      "offramps",
      rampType,
      session?.user?.accessToken
    );
    if (request?.url) window.location = request?.url;
  };
  return (
    <Box px="1rem" w="full">
      <Heading as="h3">
        <Text fontSize="32px" color="socialIconsGray">
          Withdraw from your Wallet
        </Text>
      </Heading>
      <VStack spacing="1.5rem" mt="1.5rem">
        {/* <Box w="full">
          <Button
            variant="ramps"
            color="#22272F"
            onClick={() => handleClickCashOut("RAMP_NETWORK")}
          >
            <Image src={"payment-ramp.svg"} alt="Ramp" />
          </Button>
        </Box> */}
        <Box w="full">
          <Button
            variant="ramps"
            color="#4A4D53"
            onClick={() => handleClickCashOut("COINBASE")}
          >
            <Image src={"payment-coinbase.svg"} alt="" />
            <Text ml="1rem">Coinbase</Text>
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

export default CashOut;
