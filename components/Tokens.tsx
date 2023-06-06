import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DollarIcon from "./icons/DollarIcon";
import ExportIcon from "./icons/ExportIcon";
import ImportIcon from "./icons/ImportIcon";
import Link from "next/link";
import { UserBalance } from "types/keypEndpoints";
import MaticIcon from "./icons/MaticIcon";

const assetsData = {
  MATIC: {
    balance: "25000000000000000",
    balanceBn: {
      type: "BigNumber",
      hex: "0x58d15e17628000",
    },
    formatted: "0.025",
    decimals: 18,
    symbol: "MATIC",
    name: "MATIC",
    tokenAddress: null,
    network: "POLYGON",
    chainId: 137,
  },
  USDC: {
    balance: "0",
    balanceBn: {
      type: "BigNumber",
      hex: "0x00",
    },
    formatted: "0.0",
    decimals: "6",
    symbol: "USDC",
    name: "USD Coin (PoS)",
    tokenAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    network: "POLYGON",
    chainId: 137,
  },
};

const getAssetSympol = (name: string) => {
  switch (name) {
    case "USDC" || "ETHERIUM":
      return <DollarIcon />;
    case "MATIC":
      return <MaticIcon />;
  }
};

const Tokens = () => {
  const assetsData = {
    MATIC: {
      balance: "25000000000000000",
      balanceBn: {
        type: "BigNumber",
        hex: "0x58d15e17628000",
      },
      formatted: "0.025",
      decimals: 18,
      symbol: "MATIC",
      name: "MATIC",
      tokenAddress: null,
      network: "POLYGON",
      chainId: 137,
    },
    USDC: {
      balance: "0",
      balanceBn: {
        type: "BigNumber",
        hex: "0x00",
      },
      formatted: "0.0",
      decimals: "6",
      symbol: "USDC",
      name: "USD Coin (PoS)",
      tokenAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      network: "POLYGON",
      chainId: 137,
    },
  };

  const [assets, setAssets] = useState(assetsData);

  const renderBalances = () => {
    const assetsList = assets && Object.values(assets);

    if (assetsList && assetsList.length > 1) {
      return assetsList?.map((asset: any) => {
        return (
          <Box key={asset.symbol}>
            <Flex justifyContent="space-between" p="16px" color="#4A4D53">
              <Flex>
                <Box mr="8px">{getAssetSympol(asset.symbol)}</Box>
                <Box fontWeight="700" textTransform="capitalize">
                  {asset.symbol === "USDC"
                    ? asset.symbol
                    : asset.symbol.toLowerCase()}
                </Box>
              </Flex>
              <Flex flexDirection="column" alignItems="flex-end">
                <Box fontWeight="700">${asset.formatted}</Box>
                <Box color="#63676F" fontWeight="400" fontSize="12px">
                  2,500 USDC
                </Box>
              </Flex>
            </Flex>
            <Divider borderColor="rgba(255, 255, 255, 0.5)" />
            <Divider borderColor="#C6E3F3" />
          </Box>
        );
      });
    }
  };

  return (
    <Box mx="auto" width="343px" fontFamily="satoshi">
      <Heading
        as="h2"
        fontFamily="satoshi"
        color="#80858E"
        fontSize="16px"
        fontWeight="900"
        mb="8px"
      >
        Tokens
      </Heading>
      <Box bg="rgba(255, 255, 255, 0.8)" borderRadius="8px" width="100%">
        {renderBalances()}
        <Box>
          <Flex justifyContent="space-between" p="16px" color="#80858E">
            <Link href="/send" passHref>
              <Flex>
                <ExportIcon />
                <Text fontWeight="700" ml="10px">
                  Fund
                </Text>
              </Flex>
            </Link>
            <Link href="/send" passHref>
              <Flex>
                <Text fontWeight="700" mr="10px">
                  Cash Out
                </Text>
                <ImportIcon />
              </Flex>
            </Link>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Tokens;
