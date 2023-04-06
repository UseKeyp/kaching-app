import { Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useFormContext } from "context/FormContext";
// import UseTokenBalance from "hooks/useTokenBalance";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { UserBalance } from "types/keypEndpoints";
import { supportedAssets } from "utils/general";

/**
 * @remarks component calls UseTokenBalance hook to get user token balance from Keyp API
 * @param asset - crypto asset to be sent
 * @param amount - user-generated from TransferForm
 * @returns div that renders token balance for selected token. Renders an error message if user balance < amount user wants to send
 */
const AssetBalance = () => {
  const [userAssets, setUserAssets] = useState<UserBalance | undefined>();
  const { asset, amount } = useFormContext();
  const { data: session } = useSession();

  // const getTokenBalance = () => {
  //   let userBalance = UseTokenBalance(asset);
  //   return userBalance;
  // };

  // console.log(getTokenBalance());

  useEffect(() => {
    const ACCESS_TOKEN = session?.user.accessToken;
    const userId = session?.user.id;
    const tokenAddress = supportedAssets[asset];

    const options = {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };

    const urlMATIC = `https://api.usekeyp.com/v1/users/${userId}/balance`;
    const urlNotMATIC = `https://api.usekeyp.com/v1/users/${userId}/balance/${tokenAddress}`;
    axios
      .get(asset === "MATIC" ? urlMATIC : urlNotMATIC, options)
      .then((response) => {
        // console.log(response.data);
        setUserAssets(response.data);
        console.log(userAssets);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [asset, , session?.user.accessToken, session?.user.id, userAssets]);

  // const balance = () => {
  //   if (asset === "MATIC") {
  //     return userBalance["ETH"]["formatted"];
  //   } else {
  //     return null;
  //   }
  // };

  // const displayError = (): boolean | null => {
  //   if (!amount) {
  //     return null;
  //   } else if (amount && typeof balance === "string") {
  //     if (+amount < +balance) {
  //       return true;
  //     }
  //   }
  //   return false;
  // };

  return (
    <VStack border="1px" p={1}>
      <Text>Your Balance</Text>
      {/* <Text>{`${asset === "usdc" && "$"}${balance()}`}</Text> */}
    </VStack>
  );
};

export default AssetBalance;
