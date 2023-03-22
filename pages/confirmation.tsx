import React from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

/**
 * @remarks - this component displays the transaction confirmation
 * @returns - confirmation page that displays the amount, asset, and username of the transaction
 */
const Confirmation = () => {
  const handleViewTx = () => {
    // TODO: add link to transaction in block explorer
  };

  return (
    <VStack fontWeight="extrabold" px="0.5rem" fontSize={["3rem"]}>
      <Box
        w="full"
        // py="3rem"
      >
        <Heading
          w="full"
          as="h1"
          fontSize={["6rem", "8rem"]}
          fontWeight="extrabold"
        >
          Ka-ching
        </Heading>
      </Box>
      <Stack w="full" spacing={"-0.75rem"} pb="3rem">
        <HStack>
          <Text color="formGreen">
            {/* {asset === "USDC" ? "$" : null}
              {amount} */}
            5 MATIC
          </Text>
          <Text color="assetOrange">{/* {asset} */}</Text>
        </HStack>
        <Box>
          <Text color="loginGray">Sent to</Text>
        </Box>
        <Box>
          <Text color="formBlueDark">
            {/* {username} */}
            user@gmail.com
          </Text>
        </Box>
      </Stack>
      <Stack w="full" spacing={"-0.75rem"}>
        <Box>
          <Text color="lightGray">Transaction Sent!</Text>
        </Box>
        <Box onClick={handleViewTx}>
          <Text color="formBlueDark">View</Text>
        </Box>
      </Stack>
      <Box
        w="full"
        // mx="-1.5rem"
        mt="2rem"
      >
        <Link href="/">
          <Button variant="formBlue">Return</Button>
        </Link>
      </Box>
    </VStack>
  );
};

export default Confirmation;
