import { Box, HStack, Image, Text } from "@chakra-ui/react";
import { useFormContext } from "context/FormContext";
import React from "react";
import { FaDiscord, FaGoogle } from "react-icons/fa";

/**
 * @remarks component gets rendered onto TransferForm component. Nested boxes are in place for styling purposes
 * @returns component that lets user select whether to enter Google or Discord username
 */
const ToPlatformSelection = () => {
  const { setPlatform, platform } = useFormContext();

  const handleActiveIcons = (platform: string): void => {
    if (platform === "google") {
      setPlatform("google");
    } else {
      setPlatform("discord");
    }
  };

  return (
    <HStack justifyContent="start" spacing={"1rem"}>
      <Box ml="0.5rem">
        <Text color="loginGray">To</Text>
      </Box>
      <Box
        textAlign="center"
        placeSelf="center"
        onClick={() => handleActiveIcons("google")}
      >
        {/* vector bg image*/}
        <Image
          src={
            platform === "google" ? "social-bg-dark.svg" : "social-bg-light.svg"
          }
          alt="Google"
          w="4rem"
          mt="-4"
        />
        <Box mt="-3.15rem" ml=".9rem">
          {/* Google logo */}
          <FaGoogle color="white" size="36px" />
        </Box>
      </Box>
      <Box
        textAlign="center"
        placeSelf="center"
        onClick={() => handleActiveIcons("discord")}
      >
        {/* vector bg image*/}
        <Image
          src={
            platform === "discord"
              ? "social-bg-dark.svg"
              : "social-bg-light.svg"
          }
          alt="Discord"
          ml="0.15rem"
          w="4rem"
          mt="-4"
        />
        <Box mt="-3.15rem" ml="1rem">
          {/* discord logo */}
          <FaDiscord color="white" size="36px" />
        </Box>
      </Box>
    </HStack>
  );
};

export default ToPlatformSelection;
