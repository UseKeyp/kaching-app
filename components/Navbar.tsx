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
      <Flex p="4">
        <Flex p="2">
          <Button
            colorScheme="teal"
            variant="link"
            onClick={() => router.push("/wallet")}
          >
            <WalletIcon
              color={router.pathname === "/wallet" ? "#1499DA" : "#B0B6C1"}
            />
          </Button>
        </Flex>
        <Flex p="2">
          <Button
            colorScheme="teal"
            variant="link"
            onClick={() => router.push("/send")}
          >
            <SendIcon
              color={router.pathname === "/send" ? "#1499DA" : "#B0B6C1"}
            />
          </Button>
        </Flex>
        <Flex p="2">
          <Button
            colorScheme="teal"
            variant="link"
            onClick={() => router.push("/ramp")}
          >
            <RampIcon
              color={router.pathname === "/ramp" ? "#1499DA" : "#B0B6C1"}
            />
          </Button>
        </Flex>
        <Flex p="2">
          <Button
            colorScheme="teal"
            variant="link"
            onClick={() => router.push("/apps")}
          >
            <AppsIcon
              color={router.pathname === "/apps" ? "#1499DA" : "#B0B6C1"}
            />
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default Navbar;
