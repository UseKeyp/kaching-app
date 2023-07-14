import { Box, Flex } from "@chakra-ui/layout";
import { useBalance } from "context/BalanceContext";
import AssetRow from "./AssetRow";

interface AssetsBtnsListProps {
  onClick?: (token: string) => void;
}

const AssetsBtnsList: React.FC<AssetsBtnsListProps> = ({ onClick }) => {
  const { balances, error } = useBalance();
  const assetsList = balances && Object.values(balances);

  return (
    <>
      {error && 'message' in error && (
        <Flex justifyContent="center" color="#E45200" pt="20px">
          {error.message}
        </Flex>
      )}
      {assetsList &&
        assetsList.length > 1 &&
        assetsList?.map((asset: any) => {
          return (
            <Box
              key={asset.symbol}
              onClick={() => (onClick ? onClick(asset.symbol) : null)}
              bg="rgba(255, 255, 255)"
              borderRadius="40px"
              boxShadow="0px 1px 0px #C6E3F3"
            >
              <AssetRow asset={asset} />
            </Box>
          );
        })}
    </>
  );
};

export default AssetsBtnsList;
