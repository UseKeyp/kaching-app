import { useState, useEffect } from "react";
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
import { KEYP_BASE_URL_V1 } from "utils/general";
import UseKeypApi from "../hooks/useKeypApi";

const Account = () => {
  const [openTooltip, setOpenTooltip] = useState(false);
  const [transfersData, setTransfersData] = useState<any[]>([]);

  const { data: session } = useSession();

  const address = session && session.user.address;
  const fetchTransfers = async () => {
    const res = await UseKeypApi({
      accessToken: session?.user.accessToken,
      method: "GET",
      endpointUrl: `${KEYP_BASE_URL_V1}/users/${session?.user?.id}/history`,
    });
    console.log({ res });
    console.log("arr is arr? ", Array.isArray(res));
    if (Array.isArray(res) && res.length > 0) {
      setTransfersData(res);
    }
  };

  useEffect(() => {
    if (!session) return;
    fetchTransfers();
  }, [session]);

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
          {transfersData.length > 0 &&
            transfersData.slice(0, 10).map((item: any) => {
              return item && item.hash ? (
                <TransactionDetails item={item} key={item.hash} />
              ) : null;
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
