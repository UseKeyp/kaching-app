import { Box, Heading, Image } from "@chakra-ui/react";
import React from "react";
import { PuzzleGame } from "../PuzzleGame";
import styles from "./Play.module.css";

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
        <Image
          src="/puzzle/puzzle-title.png"
          className={styles.puzzleTitleImage}
          alt="Puzzle Game"
        />
        <Heading
          fontFamily="Satoshi-Variable"
          as="h2"
          color="socialIconsGray"
          align="center"
          mb={"8"}
        >
          Solve the puzzle and get it as an NFT.
        </Heading>
        <PuzzleGame />
      </>
    </Box>
  );
};

export default Play;
