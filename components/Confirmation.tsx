import React from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useFormContext } from "context/FormContext";

const Confirmation = () => {
  const {
    asset,
    setAsset,
    amount,
    setAmount,
    username,
    setUsername,
    setInReview,
    setConfirmation,
  } = useFormContext();

  const handleViewTx = () => {
    setInReview(true);
  };

  const handleReturnHome = () => {
    setAmount();
    setUsername();
    setInReview(false);
    setConfirmation(false);
  };

  return (
    <VStack fontWeight="bold">
      <Heading
        as="h1"
        fontSize="120px"
        lineHeight="120px"
        fontWeight="extrabold"
      >
        Ka-ching
      </Heading>
      <Stack w="full" spacing={"-0.75rem"} pb="3rem">
        <HStack fontSize="32px">
          <Text color="formGreen">
            {asset === "USDC" ? "$" : null}
            {amount}
          </Text>
          <Text color="assetOrange">{asset}</Text>
        </HStack>
        <Box>
          <Text color="loginGray" fontSize="32px">
            Sent to
          </Text>
        </Box>
        <Box>
          <Text color="formBlueDark" fontSize="32px">
            {username}
          </Text>
        </Box>
      </Stack>
      <Stack w="full" spacing={"-0.75rem"}>
        <Box>
          <Text color="lightGray" fontSize="32px">
            Transaction Sent!
          </Text>
        </Box>
        <Box onClick={handleViewTx}>
          <Text color="formBlueDark" fontSize="32px">
            View
          </Text>
        </Box>

        <Box>
          <Button onClick={handleReturnHome} variant="form" color="#1499DA">
            Return
          </Button>
        </Box>
      </Stack>
    </VStack>
  );
};

export default Confirmation;
