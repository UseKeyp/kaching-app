import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import RoundedButton from "components/RoundedButton";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

const Account = () => {
  const [openTooltip, setOpenTooltip] = useState(false);

  const { data: session } = useSession();

  const address = session && session.user.address;

  const handleBtnClick = () => {
    signOut({ callbackUrl: "/login" });
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address || "");
    setOpenTooltip(true);
    setTimeout(() => {
      setOpenTooltip(false);
    }, 1000);
  };

  return (
    <Flex width="343px" mx="auto" color="#4A4D53" flexDirection="column">
      <Box width="100%" mb="28px">
        <Heading as="h2" fontSize="16px" mb="8px">
          Wallet
        </Heading>
        <Flex
          bg="rgba(255, 255, 255, 0.8)"
          borderRadius="8px"
          width="100%"
          p="16px"
        >
          <Flex justifyContent="space-between" width="100%">
            <Box>
              <Heading
                as="h3"
                fontSize="11px"
                textAlign="left"
                fontWeight="400"
                textTransform="uppercase"
              >
                Wallet Address
              </Heading>
              <Text
                textAlign="left"
                width="211px"
                fontFamily="Roboto Mono"
                fontSize="16px"
                style={{
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                {address}
              </Text>
            </Box>
            <Flex alignItems="center">
              <Tooltip
                label="Address copied to clipboard"
                isOpen={openTooltip}
                placement="bottom-end"
                fontFamily="satoshi"
              >
                <Image
                  src="copy.svg"
                  alt="copy"
                  w="32px"
                  h="32px"
                  onClick={handleCopyAddress}
                />
              </Tooltip>
            </Flex>
          </Flex>
        </Flex>
      </Box>

      <RoundedButton type="logout" text="Logout" onClick={handleBtnClick} />
    </Flex>
  );
};

export default Account;
