import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  HStack,
  Text,
  VStack,
  Flex,
  Tooltip,
} from "@chakra-ui/react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { FaGoogle, FaDiscord } from "react-icons/fa";
import useSocialLogo from "../hooks/useSocialLogo";
import { useFormContext } from "../context/FormContext";
import { RxCopy } from "react-icons/rx";
import { useSizeProvider } from "../context/SizeContext";
import { useRouter } from "next/router";

/**
 *
 * @param setNavHeight - sets the height of the navbar. Index.tsx takes this value and passes it to other components to calculate the height of the page
 * @returns - navbar component
 */
const Navbar = () => {
  const [openTooltip, setOpenTooltip] = useState(false);
  const { data: session } = useSession();
  const { handleHomePage } = useFormContext();
  const socialLogo = useSocialLogo(session);
  const router = useRouter();

  const { setNavHeight } = useSizeProvider();

  // TODO: Fix typescript errors below
  // @ts-ignore
  const address = session?.user?.address;
  // @ts-ignore
  const username = session?.user?.username;

  const handleNavigateHome = () => {
    router.push("/");
    handleHomePage();
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    setOpenTooltip(true);
    setTimeout(() => {
      setOpenTooltip(false);
    }, 1000);
  };

  const renderSocialLogo = () => {
    if (socialLogo === "discord") {
      return <FaDiscord color="#4E65F3" size="1.5rem" />;
    } else if (socialLogo === "google") {
      return <FaGoogle color="black" size="1.5rem" />;
    } else return;
  };

  useEffect(() => {
    const navHeight = document.getElementById("navbar")?.clientHeight;
    setNavHeight(navHeight || 0);
  }, [setNavHeight]);

  return (
    <Flex w="100%" py="1rem" id="navbar" fontWeight="medium">
      {/* Box holds logo */}
      <Box w="45%" alignSelf="start">
        <Heading as="h1" color="pink" onClick={() => handleNavigateHome()}>
          <Text fontWeight="extrabold">Kaching</Text>
        </Heading>
      </Box>
      {/* VStack holds everything else */}
      <VStack
        w="55%"
        alignItems="end"
        spacing={-0.5}
        fontSize={["0.85rem", "1rem", "1.25rem", "1.25rem"]}
      >
        {session && (
          // HStack holds address and sign out
          <HStack color="loginBtnGray" mb="0.5rem">
            <HStack>
              <Text>
                {address?.slice(0, 7)}
                <span>...</span>
                {address?.slice(-6)}
              </Text>
              <Tooltip
                label="Address copied to clipboard"
                isOpen={openTooltip}
                placement="bottom-end"
              >
                <Box onClick={handleCopyAddress}>
                  <RxCopy />
                </Box>
              </Tooltip>
            </HStack>

            <Box pl={["0.25rem", "1rem"]} onClick={() => signOut()}>
              <Text>Sign Out</Text>
            </Box>
          </HStack>
        )}
        {/* HStack holds social logo and username */}
        <HStack>
          <Box>{renderSocialLogo()}</Box>
          <Text color="formBlueDark">{username}</Text>
        </HStack>
      </VStack>
    </Flex>
  );
};

export default Navbar;
