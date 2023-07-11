import { Flex, Box, Text, Tooltip, HStack, Image } from "@chakra-ui/react";
import useSocialLogo from "../hooks/useSocialLogo";

import React, { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ScrollableElementContext from "context/ScrollableElementContext";

const UserAccount = () => {
  const [openTooltip, setOpenTooltip] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null
  );
  const { data: session } = useSession();

  const scrollableElementRef = useContext(ScrollableElementContext);

  const socialLogo = useSocialLogo(session);
  const router = useRouter();

  const username = session && session.user.username;
  const address = session && session.user.address;

  useEffect(() => {
    if (!scrollableElementRef?.current) {
      return;
    }

    let lastScrollY = scrollableElementRef.current.scrollTop;

    const updateScrollDirection = () => {
      const scrollY = scrollableElementRef.current?.scrollTop;
      if (scrollY === undefined || lastScrollY === undefined) {
        return;
      }

      const direction = scrollY > lastScrollY ? "down" : "up";

      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 1 || scrollY - lastScrollY < -1)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    const element = scrollableElementRef.current;

    element.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      element.removeEventListener("scroll", updateScrollDirection); // clean up
    };
  }, [scrollDirection]);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address || "");
    setOpenTooltip(true);
    setTimeout(() => {
      setOpenTooltip(false);
    }, 1000);
  };

  const renderSocialLogo = () => {
    if (socialLogo === "discord") {
      return <Image src="discord-color.svg" alt="discord icon" w="32px" />;
    } else if (socialLogo === "google") {
      return <Image src="google-color.svg" alt="google icon" w="32px" />;
    } else return;
  };

  const handleIconClick = () => {
    router.push("/account");
  };

  return (
    <Box width="100%" padding="17px">
      <Flex
        borderRadius="60px"
        height="54px"
        width="343px"
        bg="rgba(255, 255, 255)"
        paddingY="8px"
        paddingX="12px"
        align="center"
        m="auto"
      >
        <Box mr="16px">{renderSocialLogo()}</Box>
        <Flex flexDirection="column">
          <Box fontWeight={500} color="#1499DA">
            {username}
          </Box>
          <HStack>
            <Text color="#80858E">
              {address?.slice(0, 7)}
              <span>...</span>
              {address?.slice(-4)}
            </Text>
            <Tooltip
              label="Address copied to clipboard"
              isOpen={openTooltip}
              placement="bottom-end"
              fontFamily="satoshi"
            >
              <Image
                src="copy.svg"
                alt="copy"
                w="16px"
                h="16px"
                onClick={handleCopyAddress}
              />
            </Tooltip>
          </HStack>
        </Flex>
        {/* temporary sign out */}
        <Image
          src="user.svg"
          alt="user icon"
          w="32px"
          onClick={handleIconClick}
          ml="auto"
        />
      </Flex>
    </Box>
  );
};

export default UserAccount;
