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

/**
 * @remarks - this component lets user review the transaction before sending. ButtonSpacingWrapper is used place "Send" button at the bottom of the page. If useKeypApi fails and this app cannot find a truthy value for `fromEmail`, the 'Request!' button will be set to disabled.
 * @returns - review form that displays the amount, asset, and username of the transaction.
 */
const ReviewTransfer = () => {
  const [fromEmail, setFromEmail] = useState<string>();

  const {
    type,
    isActiveDiscord,
    amount,
    asset,
    username,
    setRenderTxPage,
    setRenderReviewPage,
    setIsConfirming,
  } = useFormContext();
  const { data: session } = useSession();
  const router = useRouter();

  const accessToken = session && session.user.accessToken;
  console.log(session?.user);

  /**
   * @remarks calls /oauth/me endpoint on Keyp API in order to get email address
   * @returns promise with OAuthMe type
   */
  const getUserData = async (): Promise<any> => {
    let userData = await UseKeypApi({
      accessToken,
      method: "GET",
      endpoints: "users",
      urlParams1: session?.user.id,
    });
    console.log(userData);
    setFromEmail(userData.email);
    return userData;
  };

  const userData = getUserData();
  console.log(userData);

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
  ) => {
    const request = await UseKeypApi({
      accessToken,
      method: "POST",
      endpoints: "tokens",
      urlParams1: "transfers",
      data: {
        toAddress: "",
        toUserId,
        tokenAddress: tokenAddresses[token],
        tokenType: "ERC20",
        amount,
      },
    });
    console.log(request);
    // if (request?.url) {
    //   window.location = request?.url;
    // }
  };

  const handleSendTx = async (type: string) => {
    setRenderReviewPage(false);
    setIsConfirming(true);
    if (type === "send" && asset && amount) {
      handleTokenTransfer(
        "GOOGLE-108069800288055528830",
        asset,
        amount.toString()
      );
      router.push({
        pathname: "/confirmation/send",
        query: {
          amount,
          asset,
          username,
        },
      });
    } else if (type === "request") {
      if (fromEmail) {
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
          console.log(err);
          return err;
        }
      }
    }
  };

  const handleCancel = () => {
    setRenderReviewPage(false);
    setRenderTxPage(true);
  };

  return (
    <ButtonSpacingWrapper isTransactionSlider={false}>
      <Box fontWeight="extrabold" fontSize="5rem">
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
                  {isActiveDiscord ? (
                    <FaDiscord color="white" size="2.25rem" />
                  ) : (
                    <FaGoogle color="white" size="2.25rem" />
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
        {/* <Link
          href={`/confirmation/${
            type === "send" ? "send" : "request"
          }?amount=${amount}?asset=${asset}?fromEmail=${fromEmail}?username=${username}`}
        > */}
        <Button
          onClick={() => handleSendTx(type)}
          variant="formGreen"
          isDisabled={type === "request" ? !fromEmail : false}
        >
          {type === "send" ? "Send!" : "Request!"}
        </Button>
        {/* </Link> */}
      </Box>
    </ButtonSpacingWrapper>
  );
};

export default ReviewTransfer;
