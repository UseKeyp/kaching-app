import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
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
  // TODO: use navHeight to calculate the height of the page. Subtract navHeight from 100vh to get the height of the page. This will align btn at the bottom
  const [navHeight, setNavHeight] = useState<number>();
  const handleViewTx = () => {
    // TODO: add link to transaction in block explorer
  };

  return (
    <>
      <Navbar setNavHeight={setNavHeight} />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        h={`calc(100vh - ${navHeight}px)`}
      >
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
        <Box
          mt="1rem"
          mx="-1.5rem"
          // mb="-0.5rem"
        >
          <Link href="/">
            <Button variant="formBlue">Return</Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Confirmation;
