import {
  Box,
  Button,
  GridItem,
  HStack,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useFormContext } from "context/FormContext";

import React from "react";
import { FaDiscord, FaGoogle } from "react-icons/fa";

const ReviewForm = () => {
  const {
    setInReview,
    confirmation,
    setConfirmation,
    type,
    isActiveGoogle,
    isActiveDiscord,
    amount,
    asset,
    username,
  } = useFormContext();

  console.log(amount, asset, username);

  const handleBack = () => {
    setInReview(false);
  };

  const handleSend = async () => {
    setInReview(false);
    setConfirmation(true);
  };

  return (
    <>
      <Box fontWeight="bold">
        <HStack fontSize="60px" color="formBlueDark" my={"-1rem"}>
          <Box>
            <Text opacity={type === "send" ? 1 : 0.5}>Send</Text>
          </Box>
          <Box>
            <Text opacity={type === "request" ? 1 : 0.5}>Request</Text>
          </Box>
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
            <HStack>
              <Box w={!confirmation ? "50%" : "full"}>
                <Button
                  onClick={() => handleBack()}
                  variant="form"
                  color="#1499DA"
                >
                  Back!
                </Button>
              </Box>
              <Box w="50%" display={confirmation ? "none" : ""}>
                <Button
                  onClick={() => handleSend()}
                  variant="form"
                  color="pink"
                >
                  Send!
                </Button>
              </Box>
            </HStack>
          </GridItem>
        </SimpleGrid>
      </Box>
    </>
  );
};

export default ReviewForm;
