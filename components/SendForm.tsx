import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { useFormContext } from "context/FormContext";
import React, { useState } from "react";
import AssetBalance from "./AssetBalance";
import Icon from "./Icon";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { TransferData } from "types/restAPI";
import { TransferError } from "types/keypEndpoints";
import { KEYP_BASE_URL_V1 } from "utils/general";
import { supportedAssets } from "utils/general";
import UseKeypApi from "../hooks/useKeypApi";
interface SendFormProps {
  goToStep: (step: number) => void;
}

const SendForm: React.FC<SendFormProps> = ({ goToStep }) => {
  const [success, setSuccess] = useState(true);
  const [hash, setHash] = useState("0x1234...2526");
  const [responseError, setResponseError] = useState<
    TransferError | undefined
  >();
  const [balanceError, setBalanceError] = useState(false);

  const {
    type,
    platform,
    amount,
    setAmount,
    asset,
    setAsset,
    username,
    setRenderTxPage,
    setRenderReviewPage,
  } = useFormContext();
  const [sendingTx, setSendingTx] = useState(false);
  const router = useRouter();
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
        console.log(req.hash);
        setSuccess(true);
        setHash(req.hash);
        router.push({
          pathname: "/confirmation/send",
          query: {
            amount,
            asset,
            username,
            hash: req.hash,
          },
        });
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
          <Text mb="8px" color="#99DA67" fontSize="12px" fontWeight="400">View on Chain Explorer</Text>
          <Text mb="34px" color="#155A11" fontSize="12px">{hash}</Text>
        </>
      ) : (
        <Flex justifyContent="center" mixBlendMode="overlay" mb="70px">
          <Icon name="arrows" size="153px" />
        </Flex>
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
      <Button
        onClick={() => handleTxType()}
        isLoading={sendingTx}
        loadingText={type === "request" ? "Requesting..." : "Sending..."}
        type="submit"
        width="343px"
        border="2px solid #0D7007"
        borderRadius="40px"
        height="64px"
        bg="transparent" // change if enabled
        fontSize="24px"
        fontFamily="satoshi"
        color="#0D7007"
        px="24px"
        py="16px"
      >
        <Text>Send payment</Text>
        <Box ml="auto">
          <Icon name="arrowRight" color="#0D7007" />
        </Box>
      </Button>
    </Flex>
  );
};

export default SendForm;
