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
import ButtonSpacingWrapper from "components/ButtonSpacingWrapper";

/**
 * @remarks - this component displays the transaction confirmation. ButtonSpacingWrapper is used place "Return" button at the bottom of the page
 * @returns - confirmation page that displays the amount, asset, and username of the transaction
 */
const Confirmation = () => {
  const handleViewTx = () => {
    // TODO: add link to transaction in block explorer
  };

  return (
    <>
      <Navbar />
      <ButtonSpacingWrapper isTransactionSlider={false}>
        <VStack fontWeight="extrabold" fontSize="3rem">
          <Box w="full">
            <Heading
              w="full"
              as="h1"
              fontSize={["6rem", "8rem"]}
              fontWeight="extrabold"
            >
              Kaching
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
        </VStack>
        <Box mt="1rem" mx="-1.5rem" mb="-1.5rem">
          <Link href="/">
            <Button variant="formBlue">Return</Button>
          </Link>
        </Box>
      </ButtonSpacingWrapper>
    </>
  );
};

export default Confirmation;
