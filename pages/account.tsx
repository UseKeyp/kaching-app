import { Box, Divider, Flex, Heading, VStack } from "@chakra-ui/react";
import RoundedButton from "components/RoundedButton";
import { signOut } from "next-auth/react";

const Account = () => {
  const handleBtnClick = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <VStack width="343px" mx="auto" color="#4A4D53">
      <Box>
        <Heading as="h2" fontSize="16px">
          Wallet
        </Heading>
        <VStack bg="rgba(255, 255, 255, 0.8)" borderRadius="8px">
          <Flex>
            <Divider borderColor="rgba(255, 255, 255, 0.5)" />
            <Divider borderColor="#C6E3F3" />
          </Flex>
        </VStack>
      </Box>
      <Box>
        <Heading as="h2" fontSize="16px">
          Private Details
        </Heading>
      </Box>
      <RoundedButton type="logout" text="Logout" onClick={handleBtnClick} />
    </VStack>
  );
};

export default Account;
