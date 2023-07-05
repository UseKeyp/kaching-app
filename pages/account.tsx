import {
  Box,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import RoundedButton from "components/RoundedButton";
import TransactionDetails from "components/TransactionDetails";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

const DATA_EXAMPLE = [
  {
    type: "TRANSFER",
    to: {
      username: "pi0neerpat",
      platform: "DISCORD",
      address: "0x2401030c1B23eBf40b1a219AF6AaD0bc582dB656",
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
    hash: "0x2401030c1B23eBf40b1a219AF6AaD0bc582dB654",
    explorerUrl: "https://polygonscan.com/tx/0xabc123...",
  },
  {
    type: "TRANSFER",
    to: {
      address: "0x2401030c1B23eBf40b1a219AF6AaD0bc582dB656",
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
    hash: "0x2401030c1B23eBf40b1a219AF6AaD0bc582dB655",
    explorerUrl: "https://polygonscan.com/tx/0xabc123...",
  },
  {
    type: "CONTRACT_CALL",
    contractAddress: "0xbbb1111",
    methodName: "deposit", // MintAndDeposit...WithRedeption
    timestamp: "2021-09-01T00:00:00Z",
    hash: "0x2401030c1B23eBf40b1a219AF6AaD0bc582dB656",
    explorerUrl: "https://polygonscan.com/tx/0xabc123...",
  },
];

const Account = () => {
  const [openTooltip, setOpenTooltip] = useState(false);
  const [data, setData] = useState(DATA_EXAMPLE);

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
          {data &&
            data.map((item, index) => {
              return <TransactionDetails item={item} key={item.hash} />;
            })}
          <Link
            href={`https://polygonscan.com/address/${address}`}
            p="16px"
            fontWeight="700"
            target="_blank"
          >
            View All Transactions on Explorer
          </Link>
        </Flex>
      </Box>

      <RoundedButton type="logout" text="Logout" onClick={handleBtnClick} />
    </Flex>
  );
};

export default Account;
