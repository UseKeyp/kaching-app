import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";

interface ConfirmationProps {
  amount: number;
  email: string;
}

const Confirmation: React.FC<ConfirmationProps> = ({ amount, email }) => {
  return (
    <Box>
      <VStack>
        <Heading as="h1">Ka-ching</Heading>
        <Box>
          <Text>{amount}</Text>
        </Box>
        <Box>
          <Text>Sent to</Text>
        </Box>
        <Box>
          <Text>{email}</Text>
        </Box>
      </VStack>
      <VStack></VStack>
    </Box>
  );
};

export default Confirmation;
