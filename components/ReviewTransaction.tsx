import {
  Box,
  Button,
  GridItem,
  HStack,
  Link,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import useTransfer from "hooks/useTransfer";
import React from "react";
import { FaDiscord, FaGoogle } from "react-icons/fa";

interface ReviewTransactionProps {
  amount: number;
  asset: string;
  platform: string;
  username: string;
}

const ReviewTransaction: React.FC<ReviewTransactionProps> = ({
  amount,
  asset,
  platform,
  username,
}) => {
  const handleReivew = async () => {
    const data = {
      amount,
      asset,
      platform,
      username,
    };
    // TODO: plug in usrname to api so it returns
    // useTransfer(data);
  };

  return (
    <SimpleGrid columns={1} spacing={0} my={"1rem"}>
      <GridItem>{amount}</GridItem>
      <GridItem>
        <Box>{asset}</Box>
      </GridItem>
      <GridItem>
        <HStack justifyContent="space-around" px="0.5rem">
          <Box w="33%">
            <Text color="#63676F" fontSize="80px" fontWeight="extrabold">
              to
            </Text>
          </Box>
          <Box w="34%" textAlign="center" placeSelf="center">
            {/* inner Box serves as a border for FaGoogle */}
            <Box
              w="min"
              border="1px"
              rounded="full"
              p={3}
              borderColor="#C5C8CC"
              bg={platform === "google" ? "#C5C8CC" : "white"}
            >
              <FaGoogle
                color={platform === "google" ? "white" : "#C5C8CC"}
                fontSize="56px"
              />
            </Box>
          </Box>
          <Box w="34%" textAlign="center" placeSelf="center">
            <Box
              w="min"
              border="1px"
              rounded="full"
              p={3}
              borderColor="#C5C8CC"
              bg={platform === "discord" ? "#C5C8CC" : "white"}
            >
              <FaDiscord
                color={platform === "discord" ? "white" : "#C5C8CC"}
                fontSize="56px"
              />
            </Box>
          </Box>
        </HStack>
      </GridItem>
      <GridItem>{username}</GridItem>
      <GridItem>
        <Link href={"/confirmation"}>
          <Button onClick={() => handleReivew()} variant="form" color="#1499DA">
            Send!
          </Button>
        </Link>
      </GridItem>
    </SimpleGrid>
  );
};

export default ReviewTransaction;
