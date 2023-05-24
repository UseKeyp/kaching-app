import { Flex, Box, Text, Tooltip, HStack, Image } from "@chakra-ui/react";
import useSocialLogo from "../hooks/useSocialLogo";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const UserAccount = () => {
  const [openTooltip, setOpenTooltip] = useState(false);
  const { data: session } = useSession();
  const socialLogo = useSocialLogo(session);

  const username = session && session.user.username;
  const address = session && session.user.address;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address || "");
    setOpenTooltip(true);
    setTimeout(() => {
      setOpenTooltip(false);
    }, 1000);
  };

  const renderSocialLogo = () => {
    if (socialLogo === "discord") {
      return <Image src="discord-color.svg" alt="discord icon" w="32px" />;
    } else if (socialLogo === "google") {
      return <Image src="google-color.svg" alt="google icon" w="32px" />;
    } else return;
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
        <Box mr="16px">{renderSocialLogo()}</Box>
        <Flex flexDirection="column">
          <Box fontWeight={500} color="#1499DA">
            {username}
          </Box>
          <HStack>
            <Text color="#80858E">
              {address?.slice(0, 7)}
              <span>...</span>
              {address?.slice(-4)}
            </Text>
            <Tooltip
              label="Address copied to clipboard"
              isOpen={openTooltip}
              placement="bottom-end"
            >
              <Image
                src="copy.svg"
                alt="copy"
                w="16px"
                h="16px"
                onClick={handleCopyAddress}
              />
            </Tooltip>
          </HStack>
        </Flex>
        <Image
          src="user.svg"
          alt="user icon"
          w="32px"
          onClick={handleCopyAddress}
          ml="auto"
        />
      </Flex>
    </>
  );
};

export default UserAccount;
