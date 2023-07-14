import { Flex, Box, Text, Tooltip, HStack, Image } from "@chakra-ui/react";
import useSocialLogo from "../hooks/useSocialLogo";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Icon from "./Icon";

const UserAccount = () => {
  const [openTooltip, setOpenTooltip] = useState(false);
  const { data: session } = useSession();

  const socialLogo = useSocialLogo(session);
  const router = useRouter();

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
    return (
      socialLogo && (
        <Icon name={socialLogo} width="32px" height="32px" disabled />
      )
    );
  };

  const handleIconClick = () => {
    router.push("/account");
  };

  return (
    <Box width="100%" padding="17px">
      <Flex
        borderRadius="60px"
        height="54px"
        width="343px"
        bg="rgba(255, 255, 255)"
        paddingY="8px"
        paddingX="12px"
        align="center"
        m="auto"
      >
        <Box mr="16px">{renderSocialLogo()}</Box>
        <Flex flexDirection="column">
          <Box fontWeight={500} color="#1499DA">
            {username}
          </Box>
          <HStack>
            <Icon name="polygon" />
            <Text color="#80858E">
              {address?.slice(0, 7)}
              <span>...</span>
              {address?.slice(-4)}
            </Text>
            <Tooltip
              label="Address copied to clipboard"
              isOpen={openTooltip}
              placement="bottom-end"
              fontFamily="satoshi"
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
          onClick={handleIconClick}
          ml="auto"
        />
      </Flex>
    </Box>
  );
};

export default UserAccount;
