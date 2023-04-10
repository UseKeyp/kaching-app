import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  GridItem,
  HStack,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useFormContext } from "../context/FormContext";
import { FaDiscord, FaGoogle } from "react-icons/fa";
import ButtonSpacingWrapper from "./ButtonSpacingWrapper";
import UseKeypApi from "../hooks/useKeypApi";
import UseNodeMailer from "../hooks/useNodemailer";
import { tokenAddresses } from "../utils/tokenAddresses";
import { TransferData } from "types/restAPI";
import { TransferError } from "types/keypEndpoints";

interface HandleRequestProps {
  amount: number | undefined;
  asset: string;
  fromEmail: string | undefined;
  username: string | undefined;
}

/**
 * @remarks - this component lets user review the transaction before sending. ButtonSpacingWrapper is used place "Send" button at the bottom of the page. If useKeypApi fails and this app cannot find a truthy value for `fromEmail`, the 'Request!' button will be set to disabled.
 * @returns - review form that displays the amount, asset, and username of the transaction.
 */
const ReviewTransfer = () => {
  const [txFail, setTxFail] = useState(false);
  const [responseError, setResponseError] = useState<TransferError | null>();

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
    // setIsConfirming,
  } = useFormContext();
  const [sendingTx, setSendingTx] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  // TODO: remove || after fixing email on session
  const fromEmail = session?.user.email || "";

  console.log(session);

  // CODE BELOW IS DEPRECATED - CAN MORE EASILY GET EMAIL FROM SESSION. DELETE WHEN session.user.email IS FIXED
  // /**
  //  * @remarks calls `users/:user` endpoint on Keyp API to get email address
  //  * @returns promise with user data
  //  */
  // const getUserData = async (): Promise<Info> => {
  //   let userData = await UseKeypApi({
  //     accessToken: session?.user.accessToken,
  //     method: "GET",
  //     endpoints: "users",
  //     urlParams1: session?.user.id,
  //   });
  //   // TODO: email property doesn't exist until API gets fixed
  //   setFromEmail(userData.email);
  //   return userData;
  // };
  // getUserData();
  // console.log(getUserData());

  /**
   * @remarks - makes POST request to /tokens/transfers endpoint. If `toUserId` is provided, `toAddress` can be an empty string
   * @param toUserId - username should be format `GOOGLE-1098204....` or `DISCORD-109245...`
   * @param token - ERC20 token address
   * @param amount - token amount
   */
  const handleTokenTransfer = async (
    toUserId: string,
    token: string,
    amount: string
  ): Promise<TransferData> => {
    const request: TransferData = await UseKeypApi({
      accessToken: session?.user.accessToken,
      method: "POST",
      endpoints: "tokens",
      urlParams1: "transfers",
      data: {
        toUserUsername: toUserId,
        toUserProviderType: platform === "discord" ? "DISCORD" : "GOOGLE",
        tokenAddress: tokenAddresses[token],
        tokenType: "ERC20",
        amount,
      },
    });
    console.log("data", {
      toUserUsername: toUserId,
      toUserProviderType: platform === "discord" ? "DISCORD" : "GOOGLE",
      tokenAddress: tokenAddresses[token],
      tokenType: "ERC20",
      amount,
    });

    return request;
  };

  const handleSendTx = async () => {
    if (asset && amount && username) {
      const req = await handleTokenTransfer(username, asset, amount.toString());
      console.log(req);
      if (req.status === "SUCCESS") {
        console.log(req);
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
        setSendingTx(false);
      }
    }
  };

  // when user requests funds from another user, Nodemailer sends an email to user
  const handleRequest = async ({
    amount,
    asset,
    fromEmail,
    username,
  }: HandleRequestProps) => {
    const data = {
      amount,
      asset,
      fromEmail,
      username,
    };
    try {
      await UseNodeMailer(data);
      router.push({
        pathname: "/confirmation/request",
        query: {
          amount,
          asset,
          username,
        },
      });
      return;
    } catch (err) {
      setSendingTx(false);
      // console.log(err);
      return err;
    }
  };

  const handleTxType = async () => {
    setSendingTx(true);
    // setRenderReviewPage(false);
    // setIsConfirming(true);
    if (type === "send") {
      await handleSendTx();
    } else if (type === "request") {
      handleRequest({ amount, asset, fromEmail, username });
    }
  };

  // resetting setAsset ensures that `displayBalance` in AssetBalance component renders correctly
  const handleCancel = () => {
    setAmount(0);
    setAsset("USDC");
    setRenderReviewPage(false);
    setRenderTxPage(true);
  };

  const disabledButtonLogic = () => {
    if (type === "request" && !fromEmail) {
      return true;
    }
    // else if (type === "send" && txFail) {
    //   return true;
    // }
  };

  console.log(responseError?.error);

  return (
    <ButtonSpacingWrapper isTransactionSlider={false}>
      <Box fontWeight="extrabold" fontSize="5rem" px={[0, 0, "5rem"]}>
        <HStack
          color="formBlueDark"
          fontSize={["3.5rem", "5rem"]}
          justifyContent="space-between"
        >
          <Box>
            <Text color="formBlueDark" opacity={0.5}>
              {type === "send" ? "Send" : "Request"}
            </Text>
          </Box>
          <Button
            variant="none"
            opacity={0.5}
            fontSize={["3.5rem", "5rem"]}
            color="cancelOrange"
            onClick={() => handleCancel()}
          >
            Cancel
          </Button>
        </HStack>
        <SimpleGrid columns={1} spacing={0} mb={"1rem"}>
          <GridItem>
            <Text color="formGreen">{amount}</Text>
          </GridItem>
          <GridItem my={-2}>
            <Box>
              <Text color="assetOrange">{asset}</Text>
            </Box>
          </GridItem>
          <GridItem my={-2}>
            <HStack justifyContent="start" px="0.5rem">
              <Box mr={"1rem"}>
                <Text color="loginGray">To</Text>
              </Box>
              <Box textAlign="center" placeSelf="center">
                {/* vector bg image*/}
                <Image
                  src={"social-bg-dark.svg"}
                  alt=""
                  ml="0.15rem"
                  w="4rem"
                  color="black"
                  mt="-4"
                />
                <Box mt="-3.15rem" ml="1rem">
                  {/* discord logo */}
                  {platform === "discord" ? (
                    <FaDiscord color="white" size="36px" />
                  ) : (
                    <FaGoogle color="white" size="36px" />
                  )}
                </Box>
              </Box>
            </HStack>
          </GridItem>
          <GridItem my={-2}>
            <Text color="formLightBlue">{username}</Text>
          </GridItem>
        </SimpleGrid>
      </Box>
      <Box mt="1rem" mx="-1.5rem" mb="-1rem">
        {responseError?.error && (
          <Box
            w="80%"
            m="auto"
            textAlign="center"
            fontSize="26px"
            fontWeight="normal"
            color="errorOrange"
          >
            <Text>{responseError.error}</Text>
          </Box>
        )}
        <Button
          onClick={() => handleTxType()}
          variant="formGreen"
          isDisabled={disabledButtonLogic()}
          isLoading={sendingTx}
          loadingText={type === "request" ? "Requesting..." : "Sending..."}
        >
          {type === "send" ? "Send!" : "Request!"}
        </Button>
      </Box>
    </ButtonSpacingWrapper>
  );
};

export default ReviewTransfer;
