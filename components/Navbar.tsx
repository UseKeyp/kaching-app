import React, { useEffect, useState } from "react";
import { Box, Link, Flex, Button, Spacer } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import useSocialLogo from "../hooks/useSocialLogo";
import { RxCopy } from "react-icons/rx";
import { useSizeProvider } from "../context/SizeContext";
import UserAccount from "./UserAccount";

const Navbar = () => {
  const router = useRouter();

  const { data: session } = useSession();
  const socialLogo = useSocialLogo(session);

  const address = session && session.user.address;
  const username = session && session.user.username;

  const handleNavigateHome = () => {
    window.location.href = "/";
  };

  return (
    <>
      <Flex p="4" boxShadow="md" bg="teal.400">
        <Box p="2">
          <Button
            colorScheme="teal"
            variant="link"
            onClick={() => router.push("/wallet")}
          >
            Wallet
          </Button>
        </Box>
        <Box p="2">
          <Button
            colorScheme="teal"
            variant="link"
            onClick={() => router.push("/send")}
          >
            Send
          </Button>
        </Box>
        <Box p="2">
          <Button
            colorScheme="teal"
            variant="link"
            onClick={() => router.push("/ramp")}
          >
            Ramp
          </Button>
        </Box>
        <Box p="2">
          <Button
            colorScheme="teal"
            variant="link"
            onClick={() => router.push("/apps")}
          >
            Apps
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default Navbar;
