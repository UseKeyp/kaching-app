import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";

const LoginPage = () => {
  const { data: session } = useSession();
  console.log(session);

  return (
    <>
      {session && (
        <>
          <Text>Signed in as {session && session?.user?.username}</Text>
          <Button onClick={() => signOut()}>Sign out</Button>
        </>
      )}
      {!session && (
        <>
          <Heading as="h1">Login to Example</Heading>
          <Box>
            <Box>
              <Button
                onClick={() =>
                  signIn("keyp", undefined, "login_provider=google")
                }
              >
                Log in with Google
              </Button>
              <Button
                onClick={() =>
                  signIn("keyp", undefined, "login_provider=discord")
                }
              >
                Log in with Discord
              </Button>
              <Button
                onClick={() =>
                  signIn("keyp", undefined, "login_provider=chess")
                }
              >
                Log in with Chess
              </Button>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default LoginPage;

// (<>
//     <Text> Signed in as {session.user.username}</Text>
//     <Button onClick={() => signOut()}>Sign out</Button>
//   </>)
// :
// (<>
//   <Heading as="h1">Login to Example</Heading>
//   <Box>
//     <Box>
//       <Button onClick={() => signIn("keyp", null, "login_provider=google")}>
//         Log in with Google
//       </Button>
//       <Button
//         onClick={() => signIn("keyp", null, "login_provider=discord")}
//       >
//         Log in with Discord
//       </Button>
//       <Button onClick={() => signIn("keyp", null, "login_provider=chess")}>
//         Log in with Chess
//       </Button>
//     </Box>
//   </Box>
// </>)
