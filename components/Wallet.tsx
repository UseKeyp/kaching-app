import { Box, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { UserBalance } from "types/keypEndpoints";

const Wallet = () => {
  const [assets, setAssets] = useState<UserBalance[] | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  const renderBalances = () => {
    const assetsList = assets && Object.values(assets);

    if (assetsList && assetsList.length > 1) {
      return assetsList?.map((asset: any) => {
        return (
          <HStack spacing="1rem" w="full" key={asset.symbol}>
            <Text>${Number(asset.formatted).toFixed(2)}</Text>
            <Text>{asset.symbol === "ETH" ? "MATIC" : asset.symbol}</Text>
          </HStack>
        );
      });
    } else if (assetsList && assetsList.length === 0) {
      return (
        <Box>
          <Text>No balance to display</Text>
        </Box>
      );
    }
  };

  useEffect(() => {
    const ACCESS_TOKEN = session?.user.accessToken;
    const userId = session?.user.id;

    const options = {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };

    const URL = `https://api.usekeyp.com/v1/users/${userId}/balance`;
    axios
      .get(URL, options)
      .then((response) => {
        // console.log("response", Object.values(response.data));
        setAssets(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
    // eslint-disable-next-line
  }, [assets]);

  return (
    <Box
      w={["full", "full", "80%", "50%"]}
      mx="auto"
      px={[0, 0, "5rem"]}
      justifyContent="start"
      mt="2rem"
    >
      {isLoading && (
        <VStack>
          <Text fontSize="2rem" color="pink" fontWeight="normal">
            Loading...
          </Text>
          <Image src="keyp_spinner.svg" alt="" w="3rem" />
        </VStack>
      )}
      {!isLoading && (
        <>
          <Heading as="h2" color="socialIconsGray">
            Tokens
          </Heading>
          <VStack spacing="0.5rem" fontSize="60px" color="loginGray">
            {renderBalances()}
          </VStack>
        </>
      )}
    </Box>
  );
};

export default Wallet;
