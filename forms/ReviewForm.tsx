import {
  Box,
  Button,
  GridItem,
  HStack,
  Link,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useFormContext } from "../context/FormContext";

import React from "react";
import { FaDiscord, FaGoogle } from "react-icons/fa";

/**
 * @remarks - this component lets user review the transaction before sending
 * @returns - review form that displays the amount, asset, and username of the transaction
 */
const ReviewForm = () => {
  const {
    isActiveGoogle,
    isActiveDiscord,
    amount,
    asset,
    username,
    setRenderTxPage,
    setRenderReviewPage,
  } = useFormContext();

  const handleCancel = () => {
    setRenderReviewPage(false);
    setRenderTxPage(true);
  };

  const handleSendTx = () => {
    setRenderReviewPage(false);
  };

  return (
    <>
      <Box fontWeight="bold" w="450px">
        <HStack fontSize="60px" color="formBlueDark">
          <Box>
            <Text fontSize="60px" color="formBlueDark" opacity={0.5}>
              Send
            </Text>
          </Box>
          <Button
            variant="none"
            fontSize="60px"
            opacity={0.5}
            color="cancelOrange"
            onClick={() => handleCancel()}
          >
            Cancel
          </Button>
        </HStack>
        <SimpleGrid columns={1} spacing={0} mb={"1rem"}>
          <GridItem>
            <Text fontSize="80px" color="formGreen">
              {amount}
            </Text>
          </GridItem>
          <GridItem my={-2}>
            <Box>
              <Text fontSize="80px" color="assetOrange">
                {asset}
              </Text>
            </Box>
          </GridItem>
          <GridItem my={-2}>
            <HStack justifyContent="start" px="0.5rem">
              <Box mr={"3rem"}>
                <Text color="loginGray" fontSize="80px">
                  to
                </Text>
              </Box>
              <Box
                display={isActiveGoogle ? "" : "none"}
                w="34%"
                textAlign="center"
                placeSelf="center"
              >
                {/* inner Box serves as a border for FaGoogle */}
                <Box
                  w="min"
                  border="1px"
                  rounded="full"
                  p={3}
                  borderColor="socialIconsGray"
                  bg={isActiveGoogle ? "socialIconsGray" : "white"}
                >
                  <FaGoogle
                    color={isActiveGoogle ? "white" : "socialIconsGray"}
                    fontSize="56px"
                  />
                </Box>
              </Box>
              <Box
                display={isActiveDiscord ? "" : "none"}
                w="34%"
                textAlign="center"
                placeSelf="center"
              >
                <Box
                  w="min"
                  border="1px"
                  rounded="full"
                  p={3}
                  borderColor="socialIconsGray"
                  bg={isActiveDiscord ? "socialIconsGray" : "white"}
                >
                  <FaDiscord
                    color={isActiveDiscord ? "white" : "socialIconsGray"}
                    fontSize="56px"
                  />
                </Box>
              </Box>
            </HStack>
          </GridItem>
          <GridItem my={-2}>
            <Text fontSize="80px" color="formLightBlue">
              {username}
            </Text>
          </GridItem>
          <GridItem>
            <Box w="full">
              <Link href="/confirmation">
                <Button onClick={() => handleSendTx()} variant="formBlue">
                  Send!
                </Button>
              </Link>
            </Box>
          </GridItem>
        </SimpleGrid>
      </Box>
    </>
  );
};

export default ReviewForm;
