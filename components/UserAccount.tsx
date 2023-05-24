import { Flex, Box, Text, Tooltip, HStack } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const UserAccount = () => {
  const [openTooltip, setOpenTooltip] = useState(false);

  const { data: session } = useSession();

  const username = session && session.user.username;
  const address = session && session.user.address;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address || "");
    setOpenTooltip(true);
    setTimeout(() => {
      setOpenTooltip(false);
    }, 1000);
  };

  return (
    <>
      <Flex
        borderRadius="60px"
        boxShadow="inset 0px 2px 2px #2395C0"
        height="54px"
        width="100%"
        bg="rgba(255, 255, 255, 0.9)"
        paddingY="8px"
        paddingX="12px"
        align="center"
      >
        <Box mr="16px">Icon</Box>
        <Flex flexDirection="column">
          <Box>{username}</Box>
          <HStack>
            <Text>
              {address?.slice(0, 7)}
              <span>...</span>
              {address?.slice(-4)}
            </Text>
            <Tooltip
              label="Address copied to clipboard"
              isOpen={openTooltip}
              placement="bottom-end"
            >
              <Box onClick={handleCopyAddress}>Copy</Box>
            </Tooltip>
          </HStack>
        </Flex>
        <Box ml="auto">UserIcon</Box>
      </Flex>
    </>
  );
};

export default UserAccount;
