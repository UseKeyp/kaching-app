import React, { useEffect, useState } from "react";
import { Box, Link, Flex, Button, Spacer, Image, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import useSocialLogo from "../hooks/useSocialLogo";
import { RxCopy } from "react-icons/rx";
import { useSizeProvider } from "../context/SizeContext";
import UserAccount from "./UserAccount";
import WalletIcon from "./WalletIcon";
import RampIcon from "./RampIcon";
import AppsIcon from "./AppsIcon";
import SendIcon from "./SendIcon";

const Navbar = () => {
  const router = useRouter();

  const { data: session } = useSession();
  const socialLogo = useSocialLogo(session);

  const address = session && session.user.address;
  const username = session && session.user.username;

  return (
    <>
      <Flex p="4" boxShadow="md">
        <Box p="2">
          <Button
            colorScheme="teal"
            variant="link"
            onClick={() => router.push("/wallet")}
            isActive={router.pathname === "/wallet"}
          >
            <WalletIcon
              color={router.pathname === "/wallet" ? "#1499DA" : "#B0B6C1"}
            />
          </Button>
        </Box>
        <Box p="2">
          <Button
            colorScheme="teal"
            variant="link"
            onClick={() => router.push("/send")}
            isActive={router.pathname === "/send"}
          >
            <SendIcon
              color={router.pathname === "/send" ? "#1499DA" : "#B0B6C1"}
            />
          </Button>
        </Box>
        <Box p="2">
          <Button
            colorScheme="teal"
            variant="link"
            onClick={() => router.push("/ramp")}
            isActive={router.pathname === "/ramp"}
          >
            <RampIcon
              color={router.pathname === "/ramp" ? "#1499DA" : "#B0B6C1"}
            />
          </Button>
        </Box>
        <Box p="2">
          <Button
            colorScheme="teal"
            variant="link"
            onClick={() => router.push("/apps")}
            isActive={router.pathname === "/apps"}
          >
            <AppsIcon
              color={router.pathname === "/apps" ? "#1499DA" : "#B0B6C1"}
            />
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default Navbar;
