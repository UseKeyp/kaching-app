import React from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useSocialLogo from "../hooks/useSocialLogo";
import Icon from "./Icon";

const Navbar = () => {
  const router = useRouter();

  const { data: session } = useSession();
  const socialLogo = useSocialLogo(session);

  const address = session && session.user.address;
  const username = session && session.user.username;

  const getIconColor = (name: string) => {
    if (name === "wallet" && (router.pathname === "/wallet" || router.pathname === "/")) {
      return "#1499DA";
    } else if (name === "send" && router.pathname === "/send") {
      return "#3A8500"
    } else if (name === "ramp" && router.pathname === "/ramp") {
      return "#1499DA"
    } else if (name === "apps" && router.pathname === "/apps") {
      return "#D28200"
    } else {
      return "#B0B6C1"
    }
  };

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      width="100%"
      display="flex"
      justifyContent="center"
      zIndex="99"
      bg="#FFFFFF"
    >
      <Flex p="4" gap="40px">
        <Flex>
          <Button
            colorScheme="teal"
            variant="link"
            onClick={() => router.push("/wallet")}
          >
            <Icon
              name="wallet"
              color={getIconColor("wallet")}
            />
          </Button>
        </Flex>
        <Flex>
          <Button
            colorScheme="teal"
            variant="link"
            onClick={() => router.push("/send")}
          >
            <Icon
              name="send"
              color={getIconColor("send")}
            />
          </Button>
        </Flex>
        <Flex>
          <Button
            colorScheme="teal"
            variant="link"
            onClick={() => router.push("/ramp")}
          >
            <Icon
              name="ramp"
              color={getIconColor("ramp")}
            />
          </Button>
        </Flex>
        <Flex>
          <Button
            colorScheme="teal"
            variant="link"
            onClick={() => router.push("/apps")}
          >
            <Icon
              name="apps"
              color={getIconColor("apps")}
            />
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
