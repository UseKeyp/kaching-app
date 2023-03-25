import React from "react";
import { Box, Button, Heading, Image, Text, VStack } from "@chakra-ui/react";
import UseApi from "../hooks/useApi";
import { useSession } from "next-auth/react";
import { useFormContext } from "context/FormContext";
import ButtonSpacingWrapper from "./ButtonSpacingWrapper";

/**
 * @remarks - this component lets user withdraw from their wallet. ButtonSpacingWrapper is used place "Back" button at the bottom of the page
 * @returns - CashOut component that displays offramps for users to withdraw from their wallet
 */
const CashOut = () => {
  const { data: session } = useSession();
  const { handleHomePage } = useFormContext();

  const handleClickCashOut = async (rampType: string) => {
    const request = await UseApi(
      "offramps",
      rampType,
      // TODO: Fix typescript errors belo
      // @ts-ignore
      session?.user?.accessToken
    );
    if (request?.url) window.location = request?.url;
  };

  return (
    <ButtonSpacingWrapper isTransactionSlider={true}>
      <Box h="100vh" alignContent="space-around">
        <Heading as="h3">
          <Text color="socialIconsGray">Withdraw from your Wallet</Text>
        </Heading>
        <VStack spacing="1.5rem" mt="2.5rem">
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
      </Box>
      <Box mt="1rem" mx="-1.5rem" mb="-1rem">
        <Button variant="formBlue" onClick={() => handleHomePage()}>
          Back
        </Button>
      </Box>
    </ButtonSpacingWrapper>
  );
};

export default CashOut;
