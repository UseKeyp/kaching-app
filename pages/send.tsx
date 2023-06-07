import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import Icon from "components/Icon";
import React from "react";

const Send = () => {
  return (
    <Flex fontFamily="satoshi" flexDirection="column" alignItems="center">
      <Flex justifyContent="center" mixBlendMode="overlay" mb="70px">
        <Icon name="arrows" size="153px" />
      </Flex>
      <Flex width="343px" flexDirection="column" alignItems="center" mx="auto" mb="43px">
        <Input
          placeholder="Recipient"
          mb="24px"
          height="64px"
          bg="rgba(255, 255, 255, 0.8)"
          fontSize="24px"
          fontWeight="400"
          _placeholder={{ color: "#155A11", opacity: 1 }}
        />
        <Input height="64px" bg="rgba(255, 255, 255, 0.8)" mb="6px" />
        <Flex
          alignSelf="flex-start"
          justifyContent="space-between"
          width="100%"
        >
          <Box fontWeight="400" color="#63676F">
            Available balance 2,458.88 USDC
          </Box>
          <Box>
            <Icon name="maticGray" />
          </Box>
        </Flex>
      </Flex>
      <Button
        width="343px"
        border="2px solid #0D7007"
        borderRadius="40px"
        height="64px"
        bg="transparent"
        fontSize="24px"
        fontFamily="satoshi"
        color="#0D7007"
        px="24px"
        py="16px"
      >
        <Text>Send payment</Text>
        <Box ml="auto">
          <Icon name="arrowRight" />
        </Box>
      </Button>
    </Flex>
  );
};

export default Send;
