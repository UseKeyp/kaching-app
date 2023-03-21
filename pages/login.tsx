import React from "react";
import { Box, Button, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Login = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    }
  }, [session, router]);

  return (
    <>
      <Box textAlign="center" fontFamily="inter">
        <Heading as="h1" color="pink">
          <Text fontSize="2rem" fontFamily="sharpie">
            Kaching
          </Text>
        </Heading>

        <Box my={"2rem"}>
          <Text textAlign="center" fontSize="2rem">
            👋
          </Text>
        </Box>
        <Stack direction="column" m="auto" spacing={3} textAlign="left">
          <Box w="full" textAlign="left" color="loginGray">
            Log in with
          </Box>
          <Box>
            <Button
              variant="login"
              leftIcon={<Image src={"google-color.svg"} alt="" />}
              iconSpacing="1rem"
              onClick={() => signIn("keyp", undefined, "login_provider=GOOGLE")}
            >
              Log in with Google
            </Button>
          </Box>
          <Box>
            <Button
              variant="login"
              leftIcon={<Image src={"discord-color.svg"} alt="" />}
              iconSpacing="1rem"
              onClick={() =>
                signIn("keyp", undefined, "login_provider=DISCORD")
              }
            >
              Log in with Discord
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
