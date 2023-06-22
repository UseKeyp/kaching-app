import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import Icon from "components/Icon";
import RoundedButton from "components/RoundedButton";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

const DATA_EXAMPLE = [
  {
    type: "TRANSFER",
    to: {
      username: "pi0neerpat",
      platform: "DISCORD",
      address: "0xffff123...",
    },
    amount: {
      type: "POLYGON_MATIC",
      value: "25000000000000000",
      valueBn: {
        type: "BigNumber",
        hex: "0x58d15e17628000",
      },
      formatted: "0.025",
      decimals: 18,
      symbol: "MATIC",
      name: "Matic",
      tokenAddress: null,
      network: "polygon",
      chainId: 137,
    },
    timestamp: "2021-09-01T00:00:00Z",
    hash: "0xabc123...",
    explorerUrl: "https://polygonscan.io/tx/0xabc123...",
  },
  {
    type: "TRANSFER",
    to: {
      address: "0x2401...",
    },
    amount: {
      type: "POLYGON_MATIC",
      value: "25000000000000000",
      valueBn: {
        type: "BigNumber",
        hex: "0x58d15e17628000",
      },
      formatted: "0.025",
      decimals: 18,
      symbol: "MATIC",
      name: "Matic",
      tokenAddress: null,
      network: "polygon",
      chainId: 137,
    },
    timestamp: "2021-09-01T00:00:00Z",
    hash: "0xabc123...",
    explorerUrl: "https://polygonscan.io/tx/0xabc123...",
  },
  {
    type: "CONTRACT_CALL",
    contractAddress: "0xbbb1111",
    methodName: "deposit",
    timestamp: "2021-09-01T00:00:00Z",
    hash: "0xabc123...",
    explorerUrl: "https://polygonscan.io/tx/0xabc123...",
  },
];

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
        <Flex bg="rgba(255, 255, 255, 0.8)" borderRadius="8px" width="100%">
          <Flex justifyContent="space-between" width="100%" p="16px">
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

      <Box width="100%" mb="15px">
        <Heading as="h2" fontSize="16px" mb="8px">
          Recent Transactions
        </Heading>
        <Flex
          bg="rgba(255, 255, 255, 0.8)"
          borderRadius="8px"
          width="100%"
          flexDirection="column"
          overflow="hidden"
        >
          <Box>
            <Flex p="16px" fontSize="11px" justifyContent="space-between" lineHeight="130%">
              <Flex gap={1} flexDirection="column" justifyContent="space-between" alignItems="flex-start">
                <Text textTransform="uppercase">Jan 04</Text>
                <Icon name="matic" width="16px" height="16px" />
                <Text>Recipient</Text>
              </Flex>
              <Flex gap={1} flexDirection="column" justifyContent="space-between" alignItems="flex-end">
                <Text textTransform="uppercase">Transfer</Text>
                <Text fontSize="16px" fontWeight="700">2.5436 MATIC</Text>
                <Text>0x2401030c1B23eBf40b1a219AF6AaD0bc582dB654</Text>
              </Flex>
            </Flex>
            <Divider borderColor="rgba(255, 255, 255, 0.5)" />
            <Divider borderColor="#C6E3F3" />
          </Box>

          <Box>
            <Box p="16px">SeconsRow</Box>
            <Divider borderColor="rgba(255, 255, 255, 0.5)" />
            <Divider borderColor="#C6E3F3" />
          </Box>
        </Flex>
      </Box>

      <RoundedButton type="logout" text="Logout" onClick={handleBtnClick} />
    </Flex>
  );
};

export default Account;
