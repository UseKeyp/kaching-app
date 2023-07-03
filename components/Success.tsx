import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { useFormContext } from "context/FormContext";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useState } from "react";
import Icon from "./Icon";
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

const Success = () => {
  const [hash, setHash] = useState("");
  const router = useRouter();

  const {
    platform,
    amount,
    asset,
    username,
    setAmount,
    setUsername,
    setAsset,
  } = useFormContext();

  const handleBtnClick = () => {
    setAmount(undefined);
    setUsername(undefined);
    setAsset("USDC");
    router.push("/send");
  };
  return (
    <>
      <Flex
        fontFamily="satoshi"
        flexDirection="column"
        alignItems="center"
        className="sendform"
        width="343px"
        mx="auto"
      >
        <>
          <Box mb="18px">
            <Icon name="transaction_success" />
          </Box>
          <Link href={`https://polygonscan.com/tx/${hash}`} target="_blank">
            <Text mb="8px" color="white" fontSize="16px" fontWeight="400">
              View on Block Explorer
            </Text>
          </Link>
          <Text mb="34px" color="#155A11" fontSize="12px">
            {trimAddress(hash)}
          </Text>
        </>

        <Flex
          width="343px"
          flexDirection="column"
          alignItems="center"
          mx="auto"
          mb="43px"
        >
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
              mb="8px"
              border="none"
              borderColor="none"
              disabled
            />
            {username && username !== "" && username !== null && (
              <Flex
                alignItems="center"
                justifyContent="flex-start"
                width="100%"
              >
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
          <Flex>
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
              disabled
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
              opacity="0.4"
            >
              {asset}
            </Box>
          </Flex>
        </Flex>
        <RoundedButton onClick={handleBtnClick} text="Send Another Payment" />
      </Flex>
    </>
  );
};

export default Success;
