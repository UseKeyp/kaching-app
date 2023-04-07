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
  const tokenAddress = supportedAssets[asset];

  const balance = () => {
    if (userAssets) {
      if (asset === "MATIC") {
        let formattedAsset = userAssets["ETH"]?.formatted;
        console.log(formattedAsset);
        return Number(formattedAsset).toFixed(4);
      } else {
        let { ...address } = userAssets;
        let formattedAsset = Object.values(address)[0].formatted;
        return Number(formattedAsset).toFixed(4);
      }
    } else {
      return null;
    }
  };
  console.log(balance());
  // const getTokenBalance = () => {
  //   let userBalance = UseTokenBalance(asset);
  //   return userBalance;
  // };

  // console.log(getTokenBalance());

  useEffect(() => {
    const ACCESS_TOKEN = session?.user.accessToken;
    const userId = session?.user.id;

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
        console.log("response", Object.values(response.data));
        setUserAssets(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line
  }, [asset]);

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
      <Text>{`${asset === "USDC" ? "$" : ""}${balance() || 0} ${asset}`}</Text>
    </VStack>
  );
};

export default AssetBalance;
