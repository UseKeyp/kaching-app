import { Box, Flex } from "@chakra-ui/layout";
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
        return <Icon name="USDC" />;
      case "WETH":
        return <Icon name="WETH" />;
      case "DAI":
        return <Icon name="DAI" />;
      case "MATIC":
        return <Icon name="MATIC" />;
      default:
        return (
          <svg
            height="24"
            width="24"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect y="0.5" width="24" height="24" rx="12" fill="white" />
            <text font-weight="bold" x="7" y="18" fill="black">
              {name.charAt(0).toUpperCase()}
            </text>
          </svg>
        );
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
