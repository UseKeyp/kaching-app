import {
  Box,
  Button,
  GridItem,
  HStack,
  Image,
  Link,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useFormContext } from "../context/FormContext";
import React, { useState } from "react";
import { FaDiscord, FaGoogle } from "react-icons/fa";
import ButtonSpacingWrapper from "./ButtonSpacingWrapper";
import UseKeypApi from "hooks/useKeypApi";
import UseNodeMailer from "../hooks/useNodemailer";
import { useRouter } from "next/router";
// import requestFunds from "../lib/requestFunds";

/**
 * @remarks - this component lets user review the transaction before sending. ButtonSpacingWrapper is used place "Send" button at the bottom of the page
 * @returns - review form that displays the amount, asset, and username of the transaction
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

  const getFromEmail = async () => {
    const fetchData = await UseKeypApi(
      "users",
      // @ts-ignore
      session?.user?.id,
      // @ts-ignore
      session?.user?.accessToken
    );
    const email = fetchData?.email;
    setFromEmail(email);
  };
  getFromEmail();

  const handleCancel = () => {
    setRenderReviewPage(false);
    setRenderTxPage(true);
  };

  const handleSendTx = async (type: string) => {
    setRenderReviewPage(false);
    setIsConfirming(true);
    if (type === "send") {
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
          console.log("catch FAIL", err);
          return err;
        }
      }
    }
  };

  return (
    <ButtonSpacingWrapper isTransactionSlider={false}>
      <Box fontWeight="extrabold" fontSize="5rem">
        <HStack
          color="formBlueDark"
          fontSize={["4rem", "5rem"]}
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
            fontSize={["4rem", "5rem"]}
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
