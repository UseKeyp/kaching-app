import { Box, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { UserBalance } from "types/keypEndpoints";
import { PuzzleGame } from "./PuzzleGame";

const Play = () => {
  const { data: session } = useSession();

  return (
    <Box
      w={["full", "full", "80%", "50%"]}
      mx="auto"
      px={[0, 0, "5rem"]}
      justifyContent="start"
      mt="2rem"
    >
      <>
        <Heading as="h2" color="socialIconsGray">
          Solve the weekly puzzle and get a special Keyp NFT airdropped.
        </Heading>
        <Text spacing="0.5rem" fontSize="sm" color="loginGray">
          play game here with wallet: {session?.user?.address}
        </Text>
        <PuzzleGame />
      </>
    </Box>
  );
};

export default Play;
