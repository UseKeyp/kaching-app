import React from "react";
import { Box, Divider, Flex, Spinner } from "@chakra-ui/react";
import { useBalance } from "context/BalanceContext";
import AssetRow from "./AssetRow";

interface BalancesProps {
  onClick?: (token: string) => void;
}

const Balances: React.FC<BalancesProps> = ({ onClick }) => {
  const { balances, loading, error } = useBalance();
  const assetsList = balances && Object.values(balances);

  // assets list is loading in BalanceContext
  console.log({ loading });
  console.log({ error });
  return (
    <>
      {loading && assetsList.length === 0 && (
        <Flex justifyContent="center" pt="20px">
          <Spinner size="md" color="blue.500"/>
        </Flex>
      )}
      {error && !loading && assetsList.length === 0 && (
        <Flex justifyContent="center" color="#E45200" pt="20px">{error.message}</Flex>
      )}
      {assetsList &&
        assetsList.length > 1 &&
        assetsList?.map((asset: any) => {
          return (
            <Box
              key={asset.symbol}
              onClick={() => (onClick ? onClick(asset.symbol) : null)}
            >
              <AssetRow asset={asset} />
              <Divider borderColor="rgba(255, 255, 255, 0.5)" />
              <Divider borderColor="#C6E3F3" />
            </Box>
          );
        })}
    </>
  );
};

export default Balances;
