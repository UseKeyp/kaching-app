import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import Icon from "./Icon";
import Balances from "./Balances";

const Tokens = () => {
  return (
    <Box mx="auto" width="343px" fontFamily="satoshi">
      <Heading
        as="h2"
        fontFamily="satoshi"
        color="#80858E"
        fontSize="16px"
        fontWeight="900"
        mb="8px"
      >
        Tokens
      </Heading>
      <Box bg="rgba(255, 255, 255, 0.8)" borderRadius="8px" width="100%">
        <Balances />
        <Box>
          <Flex justifyContent="space-between" p="16px" color="#80858E">
            <Link href="/ramp" passHref>
              <Flex>
                <Icon name="export" />
                <Text fontWeight="700" ml="10px">
                  Fund
                </Text>
              </Flex>
            </Link>
            <Link href="/send" passHref>
              <Flex>
                <Text fontWeight="700" mr="10px">
                  Cash Out
                </Text>
                <Icon name="import" />
              </Flex>
            </Link>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Tokens;
