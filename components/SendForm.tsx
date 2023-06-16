import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { useFormContext } from "context/FormContext";
import React, { useState } from "react";
import AssetBalance from "./AssetBalance";
import Icon from "./Icon";
import { useSession } from "next-auth/react";
import { TransferData } from "types/restAPI";
import { TransferError } from "types/keypEndpoints";
import { KEYP_BASE_URL_V1 } from "utils/general";
import { supportedAssets } from "utils/general";
import UseKeypApi from "../hooks/useKeypApi";
import Link from "next/link";
import RoundedButton from "./RoundedButton";

export const trimAddress = (address: string) => {
  if (typeof address !== "string") return "";

  const firstPart = address.substring(0, 2);
  const secondPart = address.substring(2, 6);
  const lastPart = address.substring(62);

  return (
    <>
      <span style={{ fontVariantLigatures: "no-common-ligatures" }}>
        {firstPart}
      </span>
      {secondPart}...{lastPart}
    </>
  );
};
interface SendFormProps {
  goToStep: (step: number) => void;
}

const SendForm: React.FC<SendFormProps> = ({ goToStep }) => {
  const [success, setSuccess] = useState(false);
  const [hash, setHash] = useState(
    "0xc22a6ac1d76f8f7e390362aed359a2922e8ba4d310bf4cef91836f729d7621ad"
  );
  const [responseError, setResponseError] = useState<
    TransferError | undefined
  >();
  const [balanceError, setBalanceError] = useState(false);

  const { type, platform, amount, asset, username } = useFormContext();
  const [sendingTx, setSendingTx] = useState(false);
  const { data: session } = useSession();

  const handleTokenTransfer = async (
    toUserId: string,
    token: string,
    amount: string
  ): Promise<TransferData> => {
    const request: TransferData = await UseKeypApi({
      accessToken: session?.user.accessToken,
      method: "POST",
      endpointUrl: `${KEYP_BASE_URL_V1}/tokens/transfers`,
      data: {
        toUserUsername: toUserId,
        toUserProviderType: platform === "discord" ? "DISCORD" : "GOOGLE",
        tokenAddress: supportedAssets[token],
        tokenType: "ERC20",
        amount,
      },
    });

    return request;
  };

  const handleSendTx = async () => {
    if (asset && amount && username) {
      const req = await handleTokenTransfer(username, asset, amount.toString());
      console.log(req);
      if (req.status === "SUCCESS") {
        console.log(req);
        setSuccess(true);
        setHash(req.hash);
        setSendingTx(false);
        return req;
      } else {
        setResponseError(req);
        console.log("error: ", req.status);
        setSendingTx(false);
      }
    }
  };

  const handleTxType = async () => {
    setSendingTx(true);
    if (type === "send") {
      await handleSendTx();
    }
    // DO NOT DELETE CODE BELOW. IT'S FOR REQUEST FEATURE
    // else if (type === "request") {
    //   handleRequest({ amount, asset, username });
    // }
  };

  return (
    <Flex
      fontFamily="satoshi"
      flexDirection="column"
      alignItems="center"
      className="sendform"
    >
      {success ? (
        <>
          <Box mb="18px">
            <Icon name="transaction_success" />
          </Box>
          <Link href={`https://polygonscan.com/tx/${hash}`} target="_blank">
            <Text mb="8px" color="#99DA67" fontSize="12px" fontWeight="400">
              View on Chain Explorer
            </Text>
          </Link>
          <Text mb="34px" color="#155A11" fontSize="12px">
            {trimAddress(hash)}
          </Text>
        </>
      ) : (
        <Box justifyContent="center" mb="70px" mixBlendMode="overlay">
            <Icon name="arrows" size="153px" />
        </Box>
      )}

      <Flex
        width="343px"
        flexDirection="column"
        alignItems="center"
        mx="auto"
        mb="43px"
      >
        <Input
          value={username ? username : ""}
          placeholder="Recipient"
          mb="24px"
          height="64px"
          bg="rgba(255, 255, 255, 0.8)"
          fontSize="24px"
          fontWeight="400"
          _placeholder={{ color: "#155A11", opacity: 1 }}
          onChange={() => {}}
          onClick={() => goToStep(2)}
        />
        <Flex onClick={() => goToStep(3)}>
          <Input
            value={amount ? `${amount}` : ""}
            textAlign="right"
            height="64px"
            bg="rgba(255, 255, 255, 0.8)"
            mb="8px"
            fontSize="24px"
            fontWeight="700"
            color="#155A11"
            placeholder={`0`}
            _placeholder={{ color: "#155A11", opacity: 1 }}
            onChange={() => {}}
            borderTopRightRadius="0px"
            borderBottomRightRadius="0px"
            borderRight="none"
            paddingRight="9px"
            border="none"
          />
          <Box
            bg="rgba(255, 255, 255, 0.8)"
            fontSize="24px"
            fontWeight="700"
            color="#155A11"
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="64px"
            borderTopRightRadius="8px"
            borderBottomRightRadius="8px"
            paddingRight="16px"
          >
            {asset}
          </Box>
        </Flex>
        <Flex
          alignSelf="flex-start"
          justifyContent="space-between"
          width="100%"
        >
          <Box fontWeight="400" color="#63676F">
            <AssetBalance setBalanceError={setBalanceError} />
          </Box>
          <Box>
            <Icon name="maticGray" />
          </Box>
        </Flex>
      </Flex>
      <RoundedButton
        isValid={!!(username && amount)}
        onClick={() => handleTxType()}
        text="Send Payment"
        isLoading={sendingTx}
        loadingText={type === "request" ? "Requesting..." : "Sending..."}
      />
    </Flex>
  );
};

export default SendForm;
