import { Box } from "@chakra-ui/react";
import NFTsList from "components/NFTsList";
import { NFTWallet } from "components/NFTWallet";
import Tokens from "components/Tokens";
import React from "react";

const Wallet = () => {
  return (
    <>
      <Box mx="auto" width="343px">
        <Box mb="30px">
          <Tokens />
        </Box>
        <NFTsList />
      </Box>
    </>
  );
};

export default Wallet;
