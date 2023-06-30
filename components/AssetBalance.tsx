import { Box, Text } from "@chakra-ui/react";
import { useBalance } from "context/BalanceContext";
import { useFormContext } from "context/FormContext";
import React, { Dispatch, useEffect, useState } from "react";
import { UserBalance } from "types/keypEndpoints";

interface AssetBalanceProps {
  setBalanceError?: Dispatch<boolean>;
}
/**
 * @remarks component calls UseTokenBalance hook to get user token balance from Keyp API
 * @param setBalanceError - useState function passed in from TransferForm. If this gets set to true, error about balance will render on TransferForm
 * @returns div that renders token balance for selected token. Renders an error message if user balance < amount user wants to send
 */
const AssetBalance: React.FC<AssetBalanceProps> = ({ setBalanceError }) => {
  const { type, asset, amount } = useFormContext();
  const { balances, loading } = useBalance();

  const formatBalance = (balance: string) => {
    return Number(balance).toFixed(4);
  };

  const getAssetBalance = () => {
    const assetData = (balances as UserBalance)[asset];
    if (!assetData) {
      return "Asset not found";
    }

    const formattedBalance = formatBalance(assetData.formatted);
    return formattedBalance;
  };

  const displayBalance = getAssetBalance();

  // useEffect(() => {
  //   /**
  //    * @remarks - pass boolean to parent component TransferForm. If balance < amount, return true and display error message in TransferForm. Loading indicator shows if API call lags
  //    * @param amount - user generated asset amount from input. Taken from FormContext
  //    * @param balance - balance of asset
  //    * @returns boolean value comparing amount to balance
  //    */
  //   const compareBalanceToInput = (
  //     amount: number | undefined,
  //     balance: number
  //   ): void => {
  //     if (amount && displayBalance) {
  //       if (balance < amount && type === "send") {
  //         setBalanceError(true);
  //       } else {
  //         setBalanceError(false);
  //       }
  //     }
  //   };

  //   compareBalanceToInput(amount, Number(displayBalance));
  // }, [type, amount, displayBalance, setBalanceError]);

  return (
    <Box fontWeight="400" color="#63676F">
      {displayBalance !== "NaN" && (
        <Text>
          {loading ? "Loading..." : `Available ${displayBalance} ${asset}`}
        </Text>
      )}
    </Box>
  );
};

export default AssetBalance;
