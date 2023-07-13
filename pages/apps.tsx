import React from "react";
import { Wrap, WrapItem, Flex, Image, Text } from "@chakra-ui/react";
import styles from "../components/Play/Play.module.css";
import Link from "next/link";

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
      <Wrap gap={6} maxW="325px" m="auto">
        {appDetails.map((app) => (
          <WrapItem key={app.url}>
            <Link href={app.url}>
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
