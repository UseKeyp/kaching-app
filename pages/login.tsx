import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { FaDiscord, FaGoogle } from "react-icons/fa";

const LoginPage = () => {
  const { data: session } = useSession();
  console.log(session);

  return (
    <>
      {/* {session && (
        <>
          <Text>Signed in as {session && session?.user?.username}</Text>
          <Button onClick={() => signOut()}>Sign out</Button>
        </>
      )} */}

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
              w="full"
              variant="outline"
              onClick={() => signIn("keyp", undefined, "login_provider=google")}
              leftIcon={<FaGoogle />}
            >
              Log in with Google
            </Button>
          </Box>
          <Box w="full">
            <Button
              w="full"
              variant="outline"
              onClick={() =>
                signIn("keyp", undefined, "login_provider=discord")
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
