import { Box, Button, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaDiscord, FaGoogle } from "react-icons/fa";

const Login = () => {
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
          <Text>Signed in as {session && session?.data?.user?.username}</Text>
          <Button onClick={() => signOut()}>Sign out</Button>
        </>
      )}

      <Box textAlign="center" fontFamily="inter">
        <Heading as="h1" color="pink">
          <Text fontSize="120px" fontFamily="sharpie">
            Kaching
          </Text>
        </Heading>

        <Box my={"2rem"}>
          <Text textAlign="center" fontSize="120px">
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
