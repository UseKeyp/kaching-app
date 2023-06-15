import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
import styles from "../components/Play/Play.module.css";

const Apps = () => {
  return (
      <>
        <Flex
            flexDirection="column"
            alignItems="start"
            maxW="full"
            mx="auto"
        >
          <Image
              height="80px"
              width="80px"
              src="/puzzle/puzzle.png"
              className={styles.puzzleIcon}
              alt="Puzzle Game"
          />
          <Text className={styles.puzzleIconText}>
            Puzzle
          </Text>
        </Flex>
      </>
  );
};

export default Apps;
