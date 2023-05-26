import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  Tooltip,
  VStack,
  Center,
} from "@chakra-ui/react";
import { RxCopy } from "react-icons/rx";
import { useSession } from "next-auth/react";
import UseKeypApi from "../hooks/useKeypApi";
import { useFormContext } from "../context/FormContext";
import ButtonSpacingWrapper from "./ButtonSpacingWrapper";
import { KEYP_BASE_URL_V1 } from "utils/general";
/**
 * @remarks - this component lets user fund their wallet. ButtonSpacingWrapper is used place "Back" button at the bottom of the page
 * @returns - Fund component that displays offramps for users to fund their wallet
 */
const Fund = () => {
  const [openTooltip, setOpenTooltip] = useState(false);
  const { data: session } = useSession();
  const { handleHomePage } = useFormContext();

  console.log("fund here");
  const handleCopyAddress = () => {
    const address = session && session.user.address;
    navigator.clipboard.writeText(address || "");
    setOpenTooltip(true);
    setTimeout(() => {
      setOpenTooltip(false);
    }, 1000);
  };

  const handleClickFund = async (rampType: string) => {
    const request = await UseKeypApi({
      accessToken: session?.user.accessToken,
      method: "GET",
      endpointUrl: `${KEYP_BASE_URL_V1}/ramps/on/${rampType}`,
    });
    if (request?.url) window.location = request?.url;
    return request.url || null;
  };

  const renderOnramper = () => {
    const ONRAMPER_KEY = process.env.NEXT_PUBLIC_ONRAMPER_KEY;
    const CURRENCY = "ETH";
    const NETWORK = "POLYGON";
    const ADDRESS = session?.user.address;
    if (!ADDRESS) {
      return <Text fontSize="xl">Sign in first</Text>;
    }
    // https://keyp-onramper.vercel.app/onramper?currency=ETH&network=POLYGON&address=0x7b86F576669f8d20a8244dABEFc65b31d7dEB3f2

    return (
      <Center height="700px">
        <iframe
          src={`https://keyp-onramper.vercel.app/onramper?currency=${CURRENCY}&network=${NETWORK}&address=${ADDRESS}`}
          frameborder="0"
          width="100%"
          height="100%"
        ></iframe>
      </Center>
    );
  };

  return (
    <ButtonSpacingWrapper isTransactionSlider={true}>
      <Box
        w={["full", "full", "80%", "50%"]}
        mx="auto"
        px={[0, 0, "5rem"]}
        mt="2rem"
      >
        <Heading as="h3">
          <Text color="socialIconsGray" textAlign="center">
            Fund your Wallet
          </Text>
        </Heading>
        <VStack my={"1rem"}>
          <Box w="full">{renderOnramper()}</Box>
          <Box w="full">
            <Tooltip
              label="Address copied to clipboard"
              isOpen={openTooltip}
              placement="bottom-start"
            >
              <Button
                variant="ramps"
                color="formBlueDark"
                onClick={handleCopyAddress}
              >
                <Box>
                  <RxCopy />
                </Box>
                <Text ml="1rem">Copy Address</Text>
              </Button>
            </Tooltip>
          </Box>
        </VStack>
      </Box>
      <Box mx="-1.5rem">
        <Button variant="formBlue" onClick={() => handleHomePage()}>
          Back
        </Button>
      </Box>
    </ButtonSpacingWrapper>
  );
};

export default Fund;
