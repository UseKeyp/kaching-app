import React, { useEffect, useState } from "react";
import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { UserBalance } from "types/keypEndpoints";
import { KEYP_BASE_URL_V1, supportedAssets } from "utils/general";
import Icon from "./Icon";

const ASSET_DUMMY_DATA = {
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
  ETH: {
    balance: "0",
    balanceBn: {
      type: "BigNumber",
      hex: "0x00",
    },
    formatted: "0.0",
    decimals: "6",
    symbol: "ETH",
    name: "Ethereum",
    tokenAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    network: "POLYGON",
    chainId: 137,
  },
};

const getAssetIcon = (name: string) => {
  console.log({name})
  switch (name) {
    case "USDC":
      return <Icon name="dollar" />;
    case "WETH":
      return <Icon name="weth" />
    case "DAI":
        return <Icon name="dai" />
    case "MATIC":
      return <Icon name="matic" />;
    default:
      return <Icon name="dollar" />;
  }
};

const getAssetName = (symbol: string) => {
  switch (symbol) {
    case "USDC":
      return "USDC";
    case "MATIC":
      return "Matic";
    case "ETH":
      return "Ethereum";
    default:
      return symbol;
  }
};

const Tokens = () => {
  const [assets, setAssets] = useState<UserBalance[] | undefined>();
  //   const [assets, setAssets] = useState(ASSET_DUMMY_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  const renderBalances = () => {
    const assetsList = assets && Object.values(assets);

    if (assetsList && assetsList.length > 1) {
      return assetsList?.map((asset: any) => {
        return (
          <Box key={asset.symbol}>
            <Flex justifyContent="space-between" p="16px" color="#4A4D53">
              <Flex>
                <Box mr="8px">{getAssetIcon(asset.symbol)}</Box>
                <Box fontWeight="700" textTransform="capitalize">
                  {getAssetName(asset.symbol)}
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

  useEffect(() => {
    if (session?.user) {
      const ACCESS_TOKEN = session.user.accessToken;
      const userId = session.user.id;

      const options = {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      };

      const firstRequest = `${KEYP_BASE_URL_V1}/users/${userId}/balance`;
      const daiRequest = `${KEYP_BASE_URL_V1}/users/${userId}/balance/${supportedAssets.DAI}`;
      const wethRequest = `${KEYP_BASE_URL_V1}/users/${userId}/balance/${supportedAssets.WETH}`;

      axios
        .all([
          axios.get(firstRequest, options),
          axios.get(daiRequest, options),
          axios.get(wethRequest, options),
        ])
        .then(
          axios.spread((firstResponse, daiResponse, wethResponce) => {
            let DAI = Object.values(daiResponse.data);
            let WETH = Object.values(wethResponce.data);
            setAssets({ ...firstResponse.data, DAI: DAI[0], WETH: WETH[0] });
            setIsLoading(false);
          })
        )
        .catch((error) => console.error(error));
    }
    // eslint-disable-next-line
  }, [session]);

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
                <Icon name="export" />
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
                <Icon name="import" />
              </Flex>
            </Link>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Tokens;
