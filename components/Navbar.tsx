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

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      width="100%"
      display="flex"
      justifyContent="center"
      padding="17px"
      zIndex="99"
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
              color={router.pathname === "/wallet" ? "#1499DA" : "#B0B6C1"}
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
              color={router.pathname === "/send" ? "#1499DA" : "#B0B6C1"}
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
              color={router.pathname === "/ramp" ? "#1499DA" : "#B0B6C1"}
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
              color={router.pathname === "/apps" ? "#1499DA" : "#B0B6C1"}
            />
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
