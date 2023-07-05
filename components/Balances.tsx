import React from "react";
import { Box, Divider, Flex } from "@chakra-ui/react";
import { useBalance } from "context/BalanceContext";
import AssetRow from "./AssetRow";

interface BalancesProps {
  onClick?: (token: string) => void;
}

const Balances: React.FC<BalancesProps> = ({ onClick }) => {
  const { balances } = useBalance();
  const assetsList = balances && Object.values(balances);

  return (
    <>
      {assetsList &&
        assetsList.length > 1 &&
        assetsList?.map((asset: any) => {
          return (
            <Box
              key={asset.symbol}
              onClick={() => (onClick ? onClick(asset.symbol) : null)}
            >
              <AssetRow asset={asset}/>
              <Divider borderColor="rgba(255, 255, 255, 0.5)" />
              <Divider borderColor="#C6E3F3" />
            </Box>
          );
        })}
    </>
  );
};

export default Balances;
