import { Box, Heading } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { PuzzleGame } from "./PuzzleGame";

const Play = () => {
  return (
    <Box
      w={["full", "full", "80%", "50%"]}
      mx="auto"
      px={[0, 0, "5rem"]}
      justifyContent="start"
      mt="2rem"
      mb="12rem"
    >
      <>
        <Heading as="h2" color="socialIconsGray" align="center" mb={"8"}>
          Solve the weekly puzzle and get a special Keyp NFT airdropped.
        </Heading>
        <PuzzleGame />
      </>
    </Box>
  );
};

export default Play;
