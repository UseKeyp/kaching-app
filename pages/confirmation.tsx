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
import Navbar from "components/Navbar";

/**
 * @remarks - this component displays the transaction confirmation
 * @returns - confirmation page that displays the amount, asset, and username of the transaction
 */
const Confirmation = () => {
  const handleViewTx = () => {
    // TODO: add link to transaction in block explorer
  };

  return (
    <>
      <Navbar />
      <VStack fontWeight="bold">
        <Heading
          as="h1"
          fontSize="2rem"
          lineHeight="2rem"
          fontWeight="extrabold"
        >
          Ka-ching
        </Heading>
        <Stack w="full" spacing={"-0.75rem"} pb="3rem">
          <HStack fontSize="0.5rem">
            <Text color="formGreen">
              {/* {asset === "USDC" ? "$" : null}
              {amount} */}
              5 MATIC
            </Text>
            <Text color="assetOrange">{/* {asset} */}</Text>
          </HStack>
          <Box>
            <Text color="loginGray" fontSize="0.5rem">
              Sent to
            </Text>
          </Box>
          <Box>
            <Text color="formBlueDark" fontSize="0.5rem">
              {/* {username} */}
              user@gmail.com
            </Text>
          </Box>
        </Stack>
        <Stack w="full" spacing={"-0.75rem"}>
          <Box>
            <Text color="lightGray" fontSize="0.5rem">
              Transaction Sent!
            </Text>
          </Box>
          <Box onClick={handleViewTx}>
            <Text color="formBlueDark" fontSize="0.5rem">
              View
            </Text>
          </Box>

          <Box>
            <Link href="/">
              <Button variant="formBlue" color="#1499DA">
                Return
              </Button>
            </Link>
          </Box>
        </Stack>
      </VStack>
    </>
  );
};

export default Confirmation;
