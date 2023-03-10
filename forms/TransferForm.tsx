import {
  Alert,
  AlertIcon,
  Box,
  Button,
  GridItem,
  HStack,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import React, { Dispatch, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FaDiscord, FaGoogle } from "react-icons/fa";
import AssetModal from "../components/AssetModal";
import { useFormContext } from "context/FormContext";

// TODO: refactor inputs so styles are put into custom Chakra theme component

/**
 * @params type - determins if tx is send or receive
 * @params inReview - passed down from Home. If True, user is reviewing transfer before sending. This TransferForm component will be set to hidden
 * @returns div containing a form
 */
const TransferForm = () => {
  const [getAsset, setGetAsset] = useState("USDC");

  const {
    type,
    setType,
    setAmount,
    setAsset,
    isActiveDiscord,
    setIsActiveDiscord,
    isActiveGoogle,
    setIsActiveGoogle,
    setUsername,
    inReview,
    setInReview,
  } = useFormContext();

  const localForm = useForm<FieldValues>();
  const {
    getValues,
    register,
    setValue,
    watch,
    trigger,
    formState: { errors, isValid },
  } = localForm;
  const values = getValues();
  watch();
  console.log(values);
  // console.log("errors", errors);

  const handleActiveIcons = (platform: string): void => {
    if (platform === "google") {
      if (!isActiveGoogle) {
        setIsActiveGoogle(true);
        setIsActiveDiscord(false);
      } else null;
    } else if (platform === "discord") {
      if (!isActiveDiscord) {
        setIsActiveDiscord(true);
        setIsActiveGoogle(false);
      } else null;
    }
  };

  const handleReivew = async () => {
    const valid = await trigger();
    console.log(valid);
    if (isValid) {
      setAmount(values.amount),
        setAsset(values.asset),
        setUsername(values.username),
        setInReview(true);
    }
  };

  useEffect(() => {
    setValue("asset", getAsset);
  }, [getAsset, setValue]);

  return (
    <Box display={inReview ? "none" : ""} fontWeight="bold">
      <HStack>
        <Button
          onClick={() => setType("send")}
          variant="none"
          fontSize="60px"
          color="formBlueDark"
          opacity={type === "send" ? 1 : 0.5}
        >
          Send
        </Button>
        <Button
          onClick={() => setType("request")}
          variant="none"
          fontSize="60px"
          color="formBlueDark"
          opacity={type === "request" ? 1 : 0.5}
        >
          Request
        </Button>
      </HStack>
      <SimpleGrid columns={1} spacing={0} my={"1rem"}>
        <GridItem>
          <Input
            type="number"
            step={0.1}
            placeholder="0.00"
            color="formGreen"
            {...register("amount", {
              required: `Enter asset amount`,
              min: 0,
            })}
          />
          <ErrorMessage
            errors={errors}
            name="amount"
            render={({ message }) => {
              return (
                <Box mb={"1rem"}>
                  <Alert status="error" variant="left-accent">
                    <AlertIcon />
                    {message}
                  </Alert>
                </Box>
              );
            }}
          />
        </GridItem>
        <GridItem px={"0.5rem"}>
          <AssetModal setGetAsset={setGetAsset} />
        </GridItem>
        <GridItem>
          <HStack justifyContent="start" px="0.5rem" spacing={"3rem"}>
            <Box my={"-0.5rem"}>
              <Text color="#63676F" fontSize="80px">
                to
              </Text>
            </Box>
            <Box textAlign="center" placeSelf="center">
              {/* inner Box serves as a border for FaGoogle */}
              <Box
                w="min"
                border="1px"
                rounded="full"
                p={3}
                borderColor="socialIconsGray"
                bg={isActiveGoogle ? "socialIconsGray" : "white"}
              >
                <FaGoogle
                  color={isActiveGoogle ? "white" : "#C5C8CC"}
                  fontSize="56px"
                  onClick={() => handleActiveIcons("google")}
                />
              </Box>
            </Box>
            <Box textAlign="center" placeSelf="center">
              <Box
                w="min"
                border="1px"
                rounded="full"
                p={3}
                borderColor="socialIconsGray"
                bg={isActiveGoogle ? "white" : "#C5C8CC"}
              >
                <FaDiscord
                  color={isActiveGoogle ? "#C5C8CC" : "white"}
                  fontSize="56px"
                  onClick={() => handleActiveIcons("discord")}
                />
              </Box>
            </Box>
          </HStack>
        </GridItem>
        <GridItem>
          <Input
            type={isActiveGoogle ? "email" : "text"}
            placeholder={isActiveGoogle ? "Add Email" : "Add Username"}
            color="#89DCFF"
            autoComplete="false"
            {...register("username", {
              required: "cannot be blank",
              minLength: {
                value: 1,
                message: "cannot be blank",
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="username"
            render={({ message }) => {
              return (
                <Box>
                  <Alert status="error" variant="left-accent">
                    <AlertIcon />
                    <Text mr={1}>{isActiveGoogle ? "Email" : "Username"}</Text>
                    {message}
                  </Alert>
                </Box>
              );
            }}
          />
        </GridItem>
        <GridItem>
          <Button onClick={() => handleReivew()} variant="form">
            Review
          </Button>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default TransferForm;
