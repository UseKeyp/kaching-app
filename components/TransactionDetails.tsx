import { Box, Divider, Flex, Link, Text } from "@chakra-ui/react";
import { Transactions } from "types/Transactions";
import Icon from "./Icon";

interface TransactionDetailsProps {
  item: Transactions;
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({ item }) => {
  const getMonthName = (date: any) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return monthNames[date.getMonth()];
  };

  const formatDate = (timestamp: any) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = ("0" + date.getMinutes()).slice(-2); // This ensures that the minutes are always two digits
    const month = getMonthName(date);
    return `${month} ${day}, ${year} ${hours}:${minutes}`;
  };

  const formattedTimestamp = formatDate(item.timestamp);
  return (
    <Link href={item.explorerUrl} target="_blank">
      <Flex
        p="16px"
        fontSize="11px"
        lineHeight="130%"
        gap={1}
        flexDirection="column"
      >
        <Flex justifyContent="space-between">
          <Text textTransform="uppercase">{formattedTimestamp}</Text>
          <Text textTransform="uppercase">
            {item.type === "CONTRACT_CALL" ? "Contract Call" : item.type}
          </Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Box>
            {item.type === "TRANSFER" ? (
              <>
                <Icon name="matic" width="16px" height="16px" />
              </>
            ) : (
              <Text
                textTransform="capitalize"
                fontSize="16px"
                fontWeight="400"
                fontFamily="Roboto Mono"
              >
                {item.methodName}
              </Text>
            )}
          </Box>
          <Box>
            {item.type === "TRANSFER" ? (
              <Text fontSize="16px" fontWeight="700">
                {item.amount?.formatted} {item.amount?.symbol}
              </Text>
            ) : (
              <></>
            )}
          </Box>
        </Flex>
        {item.type === "TRANSFER" && (
          <Flex justifyContent="space-between">
            <Text>Recipient</Text>
            <Flex alignItems="center">
              {item.to?.username && (
                <Box mr="4px">
                  <Icon
                    name={item.to.platform?.toLowerCase()}
                    width="12px"
                    color="#63676F"
                  ></Icon>
                </Box>
              )}
              <Text
                fontFamily={item.to?.username ? "Satoshi" : "Roboto Mono"}
                fontSize={item.to?.username ? "11px" : "10px"}
              >
                {item.to?.username ? item.to.username : item.to?.address}
              </Text>
            </Flex>
          </Flex>
        )}
      </Flex>
      <Divider borderColor="rgba(255, 255, 255, 0.5)" />
      <Divider borderColor="#C6E3F3" />
    </Link>
  );
};

export default TransactionDetails;
