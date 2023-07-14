import React from "react";
import { Box, Divider, Flex, Spinner } from "@chakra-ui/react";
import { useBalance } from "context/BalanceContext";
import AssetRow from "./AssetRow";

interface BalancesProps {
  onClick?: (token: string) => void;
}

const Balances: React.FC<BalancesProps> = ({ onClick }) => {
  const { balances, loading, error } = useBalance();
  const assetsList = balances

  // assets list is loading in BalanceContext
  console.log({assetsList})
  console.log({balances})
  console.log({ loading });
  console.log({ error });
  return (
    <>
      {loading && Object.values(assetsList).length === 0 && (
        <Flex justifyContent="center" pt="20px">
          <Spinner size="md" color="blue.500"/>
        </Flex>
      )}
      {error && !loading && (
        <Flex justifyContent="center" color="#E45200" pt="20px">{error.message}</Flex>
      )}
      {assetsList && !error &&
        Object.values(assetsList).length > 1 &&
        Object.values(assetsList)?.map((asset: any) => {
          console.log({asset})
          return (
            <Box
              key={asset.symbol}
              onClick={() => (onClick ? onClick(asset.symbol) : null)}
            >
              <AssetRow asset={asset} loading={loading}/>
              <Divider borderColor="rgba(255, 255, 255, 0.5)" />
              <Divider borderColor="#C6E3F3" />
            </Box>
          );
        })}
    </>
  );
};

export default Balances;
