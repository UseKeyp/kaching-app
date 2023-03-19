import { Box, Stack, Text } from "@chakra-ui/react";
import React from "react";

/**
 *
 * @returns component that renders a form for users to request funds. Sends email to user with link to transfer funds
 */
const Request = () => {
  return (
    <Stack>
      <Box>
        <Text>Asset</Text>
      </Box>
      <Box>
        <Text>Amount</Text>
      </Box>
      <Box>
        <Text>Email / discord</Text>
      </Box>
    </Stack>
  );
};

export default Request;
