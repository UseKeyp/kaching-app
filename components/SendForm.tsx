import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { useFormContext } from "context/FormContext";
import React, { useState } from "react";
import AssetBalance from "./AssetBalance";
import Icon from "./Icon";

interface SendFormProps {
  goToStep: (step: number) => void;
}

const SendForm: React.FC<SendFormProps> = ({ goToStep }) => {
  const [balanceError, setBalanceError] = useState(false);
  const { username } = useFormContext();

  return (
    <Flex fontFamily="satoshi" flexDirection="column" alignItems="center">
      <Flex justifyContent="center" mixBlendMode="overlay" mb="70px">
        <Icon name="arrows" size="153px" />
      </Flex>
      <Flex
        width="343px"
        flexDirection="column"
        alignItems="center"
        mx="auto"
        mb="43px"
      >
        <Input
          // input for recipient
          value={username ? username : ""}
          placeholder="Recipient"
          mb="24px"
          height="64px"
          bg="rgba(255, 255, 255, 0.8)"
          fontSize="24px"
          fontWeight="400"
          _placeholder={{ color: "#155A11", opacity: 1 }}
          onChange={() => {}}
          onClick={() => goToStep(2)}
        />
        <Input
          height="64px"
          bg="rgba(255, 255, 255, 0.8)"
          mb="8px"
          fontSize="16px"
          fontWeight="400"
          placeholder="$0"
          _placeholder={{ color: "#33912E", opacity: 1 }}
          onClick={() => goToStep(3)}
        />
        <Flex
          alignSelf="flex-start"
          justifyContent="space-between"
          width="100%"
        >
          <Box fontWeight="400" color="#63676F">
            <AssetBalance setBalanceError={setBalanceError} />
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
        bg="transparent" // change if enabled
        fontSize="24px"
        fontFamily="satoshi"
        color="#0D7007"
        px="24px"
        py="16px"
        disabled
      >
        <Text>Send payment</Text>
        <Box ml="auto">
          <Icon name="arrowRight" color="#0D7007"/>
        </Box>
      </Button>
    </Flex>
  );
};

export default SendForm;
