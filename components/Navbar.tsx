import React, { useState } from "react";
import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { FaGoogle, FaDiscord } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import useSocialLogo from "../hooks/useSocialLogo";

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const session = useSession();
  // console.log("session", session);

  // TODO: Fix typescript error below
  // @ts-ignore
  const address = session?.data?.user?.address || undefined;
  // @ts-ignore
  const username = session?.data?.user?.username || undefined;

  const socialLogo = useSocialLogo(session);

  const renderSocialLogo = () => {
    if (socialLogo === "discord") {
      return <FaDiscord color="#4E65F3" />;
    } else if (socialLogo === "google") {
      return <FaGoogle />;
    } else return;
  };

  const handleShowLogout = () => {
    setShowLogout(!showLogout);
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
              <HStack>
                <Box mr={-2} onClick={handleShowLogout}>
                  <MdArrowDropDown color="#80858E" />
                </Box>
                <Text fontSize="12px" color="#80858E" textAlign="right">
                  {address?.slice(0, 7)}
                  <span>...</span>
                  {address?.slice(-6)}
                </Text>
              </HStack>
            </Box>
            <Box
              display={showLogout ? "block" : "none"}
              border="1px solid gray"
              px={2}
              rounded="md"
              onClick={() => signOut()}
            >
              <Text fontSize="xs" color="loginBtnGray">
                Sign out
              </Text>
            </Box>
          </>
        )}
      </VStack>
    </HStack>
  );
};

export default Navbar;
