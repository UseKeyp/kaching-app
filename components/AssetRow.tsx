import { Box, Flex } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/react";
import { AssetBalance } from "types/keypEndpoints";
import Icon from "./Icon";

interface AssetRowProps {
  asset: AssetBalance;
  loading?: boolean;
}

const AssetRow: React.FC<AssetRowProps> = ({ asset, loading }) => {
  const getAssetIcon = (name: string) => {
    switch (name) {
      case "USDC":
        return <Icon name="dollar" />;
      case "WETH":
        return <Icon name="weth" />;
      case "DAI":
        return <Icon name="dai" />;
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

  const formatNumber = (number: string) => {
    let num = parseFloat(number);

    if (num === 0) {
      return "0.0000";
    } else if (num < 0.0001) {
      return "< 0.0001";
    } else {
      return num.toFixed(4);
    }
  };

  return (
    <Flex justifyContent="space-between" p="16px" color="#4A4D53">
      <Flex>
        <Box mr="8px">{getAssetIcon(asset.symbol)}</Box>
        <Box fontWeight="700" textTransform="capitalize">
          {getAssetName(asset.symbol)}
        </Box>
      </Flex>
      <Flex flexDirection="column" alignItems="flex-end">
        <Box fontWeight="700">
          {loading ? "Loading..." : formatNumber(asset.formatted)}
        </Box>
        <Box color="#63676F" fontWeight="400" fontSize="12px"></Box>
      </Flex>
    </Flex>
  );
};

export default AssetRow;
