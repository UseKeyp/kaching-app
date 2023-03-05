import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaDiscord, FaGoogle } from "react-icons/fa";

const LoginPage = () => {
  const { data: session } = useSession();
  console.log(session);
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <>
      {session && (
        <>
          <Text>Signed in as {session && session?.user?.username}</Text>
          <Button onClick={() => signOut()}>Sign out</Button>
        </>
      )}

      <Box textAlign="center">
        <Heading as="h1" color="green">
          <Text fontSize="120px" fontFamily="sharpie">
            Kaching
          </Text>
        </Heading>

        <Box my={"2rem"}>
          <Text textAlign="center" fontSize="120px">
            👋
          </Text>
        </Box>
        <Stack
          direction="column"
          textAlign="center"
          m="auto"
          spacing={3}
          w={["full", "70%", "50%"]}
        >
          <Box w="full" textAlign="left">
            Log in with
          </Box>
          <Box w="full">
            <Button
              variant="login"
              onClick={() => signIn("keyp", undefined, "login_provider=GOOGLE")}
              leftIcon={<FaGoogle />}
            >
              Log in with Google
            </Button>
          </Box>
          <Box w="full">
            <Button
              variant="login"
              onClick={() =>
                signIn("keyp", undefined, "login_provider=DISCORD")
              }
              leftIcon={<FaDiscord />}
            >
              Log in with Discord
            </Button>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default LoginPage;
