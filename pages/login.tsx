import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaDiscord, FaGoogle } from "react-icons/fa";
import { LoginPortal } from "@usekeyp/ui-kit";
import Icon from "components/Icon";

const Login = () => {
  const [activeBtn, setActiveBtn] = useState<string>();
  const session = useSession();
  const router = useRouter();

  // console.log(session);

  const handleLogin = (provider) => {
    signIn("keyp", undefined, `login_provider=${provider}`);
  };

  useEffect(() => {
    if (session && session.status === "authenticated") {
      router.push("/wallet");
    }
  }, [session, router]);

  return (
    <>
      <Box textAlign="center">
        <Flex justifyContent="center" mb="80px" mt="100px">
          <Icon name="kaching_title"></Icon>
        </Flex>
        <Flex justifyContent="center">
          <LoginPortal
            providers={["GOOGLE", "TWITTER", "DISCORD"]}
            additionalProviders={["TWITCH"]}
            onClick={handleLogin}
            bg="transparent"
            align="center"
          />
        </Flex>
      </Box>
    </>
  );
};

export default Login;
