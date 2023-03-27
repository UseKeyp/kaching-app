import React from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";

interface LoadingProps {
  displayText: string;
}

const Loading: React.FC<LoadingProps> = ({ displayText }) => {
  return (
    <Box textAlign="center" h="80vh" py="25vh">
      <Spinner color="pink" emptyColor="gray.100" size="xl" />
      <Box fontSize="3rem" color="pink" fontWeight="normal">
        <Text>{displayText}</Text>
      </Box>
    </Box>
  );
};

export default Loading;
