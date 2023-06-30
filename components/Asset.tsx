import { Box, Flex, Heading } from "@chakra-ui/react";
import { useBalance } from "context/BalanceContext";
import { useFormContext } from "context/FormContext";
import React from "react";
import AssetRow from "./AssetRow";
import Balances from "./Balances";

interface AssetsBtnsListProps {
  onClick?: (token: string) => void;
}

const AssetsBtnsList: React.FC<AssetsBtnsListProps> = ({ onClick }) => {
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

const Asset = ({ goToStep }: { goToStep?: any }) => {
  const { setAsset } = useFormContext();

  const handleClick = (token: string) => {
    setAsset(token);
    goToStep(3);
    return;
  };
  
  return (
    <Box overflow="hidden" width="343px" mx="auto">
      <Heading
        as="h2"
        fontWeight="700"
        fontSize="40px"
        color="#33912E"
        textTransform="capitalize"
        mb="40px"
      >
        Asset
      </Heading>
      <Flex width="100%" overflow="hidden" flexDirection="column" gap="24px">
        <AssetsBtnsList onClick={handleClick}/>
      </Flex>
    </Box>
  );
};

export default Asset;
