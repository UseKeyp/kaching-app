import React from "react";
import { Wrap, WrapItem, Flex, Image, Text, Link } from "@chakra-ui/react";
import styles from "../components/Play/Play.module.css";

const appDetails = [
  {
    url: "/play",
    imageUrl: "/puzzle/puzzle.png",
    text: "Puzzle",
  },
];

const Apps = () => {
  return (
    <>
      <Wrap gap={6}>
        {appDetails.map((app) => (
          <WrapItem>
            <Link href={app.url} key={app.url}>
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
                <Text className={styles.puzzleIconText}>{app.text}</Text>
              </Flex>
            </Link>
          </WrapItem>
        ))}
      </Wrap>
    </>
  );
};

export default Apps;
