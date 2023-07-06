import { Box, Flex, Input, Tooltip } from "@chakra-ui/react";
import { useFormContext } from "context/FormContext";
import React, { useContext, useState } from "react";
import AssetBalance from "./AssetBalance";
import Icon from "./Icon";
import { useSession } from "next-auth/react";
import { TransferData } from "types/restAPI";
import { TransferError } from "types/keypEndpoints";
import { KEYP_BASE_URL_V1 } from "utils/general";
import { supportedAssets } from "utils/general";
import UseKeypApi from "../hooks/useKeypApi";
import RoundedButton from "./RoundedButton";
import { HashContext } from "./SendScreensCollection";

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
  const [openTooltip, setOpenTooltip] = useState(false);

  const [responseError, setResponseError] = useState<
    TransferError | undefined
  >();
  const [serverError, setServerError] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState(
    "Unable to transfer because it is a very very very very long message blbabla blabla"
  );
  const [sendingTx, setSendingTx] = useState(false);
  const hashContext = useContext(HashContext);

  const { data: session } = useSession();

  const { type, platform, amount, asset, username } = useFormContext();

  if (!hashContext) {
    throw new Error("HashContext is not available");
  }

  const { setHash } = hashContext;

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
        setHash(req.hash);
        setSendingTx(false);
        goToStep(5);
        return req;
      } else {
        setResponseError(req);
        setServerError(true);
        setServerErrorMessage(req.error);
        console.log("error: ", req.status);
        setSendingTx(false);
      }
    }
  };

  const handleTxType = async () => {
    if (username && amount) {
      setSendingTx(true);
      if (type === "send") {
        await handleSendTx();
      }
    }
  };

  const handleOpenTooltip = () => {
    setOpenTooltip(true);
    setTimeout(() => {
      setOpenTooltip(false);
    }, 2000);
  };

  const truncate = (str: string, num: number) => {
    return str.length <= num ? str : str.slice(0, num) + "...";
  };

  return (
    <Flex
      fontFamily="satoshi"
      flexDirection="column"
      alignItems="center"
      className="sendform"
      width="343px"
      mx="auto"
    >
      <Flex
        width="343px"
        flexDirection="column"
        alignItems="center"
        mx="auto"
        mb="43px"
      >
        <Box justifyContent="center" mb="70px">
          <Icon name="arrows" />
        </Box>
        <Box width="100%" mb="24px">
          <Input
            value={username ? username : ""}
            placeholder="Recipient"
            height="64px"
            bg="rgba(255, 255, 255, 0.8)"
            fontSize="24px"
            fontWeight="400"
            _placeholder={{ color: "#155A11", opacity: 1 }}
            onChange={() => {}}
            onClick={() => goToStep(2)}
            mb="8px"
            border="none"
            borderColor="none"
          />
          {username && username !== "" && username !== null && (
            <Flex alignItems="center" justifyContent="flex-start" width="100%">
              <Box color="#4A4D53" mr="8px">
                Sending to
              </Box>
              <Box
                display="flex"
                width="24px"
                height="24px"
                borderRadius="100%"
                bg={"white"}
                opacity="0.4"
                justifyContent="center"
                alignItems="center"
              >
                <Icon name={platform} width="15px" height="15px" />
              </Box>
            </Flex>
          )}
        </Box>
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
            <AssetBalance />
          </Box>
        </Flex>
      </Flex>
      <Tooltip
        label={serverErrorMessage}
        fontSize="md"
        isOpen={serverErrorMessage.length > 50 ? openTooltip : false}
        color="#E45200"
      >
        <Box minHeight="19.5px">
          {responseError && (
            <Box
              color="#E45200"
              fontSize="13px"
              onClick={handleOpenTooltip}
              onMouseEnter={handleOpenTooltip}
            >
              {truncate(serverErrorMessage, 50)}
            </Box>
          )}
        </Box>
      </Tooltip>
      <RoundedButton
        isValid={!!(username && amount && !serverError)}
        onClick={() => handleTxType()}
        text="Send Payment"
        isLoading={sendingTx}
        loadingText={type === "request" ? "Requesting..." : "Sending..."}
      />
    </Flex>
  );
};

export default SendForm;
