import React, { useState } from "react";
import {
  Box,
  Button,
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

const Login = () => {
  const [activeBtn, setActiveBtn] = useState<string>();
  const session = useSession();
  const router = useRouter();

  const handleGoogleLogin = () => {
    setActiveBtn("google");
    signIn("keyp", undefined, "login_provider=GOOGLE");
  };

  const handleDiscordLogin = () => {
    setActiveBtn("discord");
    signIn("keyp", undefined, "login_provider=DISCORD");
  };

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    }
  }, [session, router]);

  return (
    <>
      <Box textAlign="center" fontFamily="sharpie" px="0.5rem">
        <Heading as="h1" color="pink" fontSize="5rem" fontWeight="extrabold">
          <Text fontFamily="sharpie">Kaching</Text>
        </Heading>

        <Box my={"2rem"}>
          <Text textAlign="center" fontSize="5rem">
            👋
          </Text>
        </Box>
        <Stack
          direction="column"
          m="auto"
          spacing={3}
          textAlign="left"
          px={[0, "5rem", "10rem", "20rem"]}
        >
          <Box
            w="full"
            textAlign="left"
            color="loginBtnGray"
            fontFamily="inter"
            fontWeight="normal"
          >
            Signup or Login with
          </Box>
          <HStack alignContent="center">
            <Button
              variant="login"
              onClick={() => handleGoogleLogin()}
              bg={activeBtn === "google" ? "googleBlue" : "white"}
              color={activeBtn === "google" ? "white" : "loginBtnGray"}
            >
              <Image
                src={
                  activeBtn === "google"
                    ? "social-bg-white.svg"
                    : "social-bg-light.svg"
                }
                alt=""
                w="2.5rem"
              />
              <Box position="absolute" ml="0.65rem">
                <FaGoogle
                  color={activeBtn === "google" ? "#4285F4" : "white"}
                  size="1.25rem"
                />
              </Box>
              <Text ml="1rem">Google</Text>
            </Button>
          </HStack>
          <Box>
            <Button
              variant="login"
              onClick={() => handleDiscordLogin()}
              bg={activeBtn === "discord" ? "discordBlue" : "white"}
              color={activeBtn === "discord" ? "white" : "loginBtnGray"}
            >
              <Image
                src={
                  activeBtn === "discord"
                    ? "social-bg-white.svg"
                    : "social-bg-light.svg"
                }
                alt=""
                w="2.5rem"
              />
              <Box position="absolute" ml="0.65rem">
                <FaDiscord
                  color={activeBtn === "discord" ? "#5865F2" : "white"}
                  size="1.25rem"
                />
              </Box>
              <Text ml="1rem">Discord</Text>
            </Button>
          </Box>
          <Box>
            <Text color="#B0B6C1" fontSize="9px">
              Powered by 🍩 Keyp
            </Text>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default Login;
