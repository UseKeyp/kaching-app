import { Box, Heading, Image } from "@chakra-ui/react";
import React from "react";
import { PuzzleGame } from "../PuzzleGame";
import styles from "./Play.module.css";

const Play = () => {
  return (
    <Box
      w={"full"}
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
        <h2 className={styles.puzzleHeading}>
          Solve the puzzle and get it as an NFT.
        </h2>
        <PuzzleGame />
      </>
    </Box>
  );
};

export default Play;
