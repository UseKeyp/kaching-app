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

const Login = () => {
  const [activeBtn, setActiveBtn] = useState<string>();
  const session = useSession();
  const router = useRouter();

  console.log(session);

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
        <Heading
          as="h1"
          color="pink"
          fontSize={["5rem", "8rem"]}
          fontWeight="extrabold"
        >
          <Text>Kaching</Text>
        </Heading>
        <Flex justifyContent="center">
          <LoginPortal
            providers={["GOOGLE", "TWITTER", "DISCORD"]}
            additionalProviders={["TWITCH"]}
            onClick={handleLogin}
          ></LoginPortal>
        </Flex>
      </Box>
    </>
  );
};

export default Login;
