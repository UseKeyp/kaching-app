import React from "react";
import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Session } from "types/session";
import { FaGoogle, FaDiscord } from "react-icons/fa";
import useSocialLogo from "../hooks/useSocialLogo";

const Navbar = () => {
  const session = useSession();

  const address = session.data?.user?.address;
  const username = session.data?.user?.username;

  const socialLogo = useSocialLogo(session);

  const renderSocialLogo = () => {
    if (socialLogo === "discord") {
      return <FaDiscord color="#4E65F3" />;
    } else if (socialLogo === "google") {
      return <FaGoogle />;
    } else return;
  };

  return (
    <HStack
      py="1rem"
      px="1rem"
      justifyContent="space-between"
      w="full"
      mb="1.5rem"
      fontSize="23px"
    >
      <Box w="50%">
        <Link href="/">
          <Heading as="h1" fontSize="23px" color="pink">
            <Text>Ka-ching</Text>
          </Heading>
        </Link>
      </Box>
      <VStack w="50%" alignItems="end" spacing={-0.5}>
        <HStack>
          {renderSocialLogo()}
          <Text fontSize="23px" color="pink">
            {username}
          </Text>
        </HStack>
        {session && (
          <>
            <Box>
              <Text fontSize="12px" color="#80858E" textAlign="right">
                {address?.slice(0, 7)}
                <span>...</span>
                {address?.slice(-6)}
              </Text>
            </Box>
            {/* <Button variant="logout" onClick={() => signOut()}>
                Sign out
              </Button> */}
          </>
        )}
      </VStack>
    </HStack>
  );
};

export default Navbar;
