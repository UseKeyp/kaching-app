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
  Image,
} from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FaDiscord, FaGoogle } from "react-icons/fa";
import AssetModal from "./AssetModal";
import { useFormContext } from "../context/FormContext";

// TODO: refactor inputs so styles are put into custom Chakra theme component

/**
 * @remarks - this component renders a form that allows user to send a transaction
 * @returns div containing a form
 */
const TransferForm = () => {
  const [getAsset, setGetAsset] = useState("MATIC");

  const {
    setAmount,
    setAsset,
    isActiveDiscord,
    setIsActiveDiscord,
    isActiveGoogle,
    setIsActiveGoogle,
    setUsername,
    renderReviewPage,
    setRenderTxPage,
    setRenderReviewPage,
  } = useFormContext();

  const localForm = useForm<FieldValues>();
  const {
    getValues,
    register,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = localForm;
  const values = getValues();
  watch();

  const emailValidation = (val: string) => {
    if (isActiveGoogle) {
      return val.includes("@gmail.com") || "must be valid gmail address";
    } else if (isActiveDiscord) {
      return val.includes("#") || "must be valid discord address";
    }
  };

  const handleActiveIcons = (platform: string): void => {
    if (platform === "google" && !isActiveGoogle) {
      setIsActiveGoogle(true);
      setIsActiveDiscord(false);
    } else if (platform === "discord" && !isActiveDiscord) {
      setIsActiveDiscord(true);
      setIsActiveGoogle(false);
    }
  };

  const handleReivew = async () => {
    const valid = await trigger();
    if (valid) {
      setAmount(values.amount),
        setAsset(values.asset),
        setUsername(values.username),
        setRenderTxPage(false);
      setRenderReviewPage(true);
    }
  };

  useEffect(() => {
    setValue("asset", getAsset);
  }, [getAsset, setValue]);

  return (
    <Box
      display={renderReviewPage ? "none" : "flex"}
      flexDirection="column"
      justifyContent="space-between"
      h="80vh"
    >
      <SimpleGrid columns={1} spacing={"1rem"} mb={".1rem"}>
        <GridItem mb="-1.5rem">
          <Input
            type="number"
            step={0.1}
            placeholder="0.00"
            color="formGreen"
            autoComplete="off"
            {...register("amount", {
              required: {
                value: true,
                message: `Enter asset amount`,
              },
              validate: (n) => n > 0 || "Value must be greater than 0",
            })}
          />
          <Box mt="-1.5rem" mb="1rem">
            <ErrorMessage
              errors={errors}
              name="amount"
              render={({ message }) => {
                return (
                  <Box mb={".1rem"}>
                    <Alert status="error" variant="left-accent">
                      <AlertIcon />
                      {message}
                    </Alert>
                  </Box>
                );
              }}
            />
          </Box>
        </GridItem>
        <GridItem px={"0.5rem"}>
          <AssetModal setGetAsset={setGetAsset} />
        </GridItem>
        <GridItem>
          <HStack justifyContent="start" spacing={"1rem"} mb="-2">
            <Box ml="0.5rem">
              <Text color="loginGray" fontSize="5rem">
                To
              </Text>
            </Box>
            <Box textAlign="center" placeSelf="center">
              {/* vector bg image*/}
              <Image
                src={
                  isActiveGoogle ? "social-bg-dark.svg" : "social-bg-light.svg"
                }
                alt=""
                w="4rem"
              />
              <Box position="absolute" mt="-3.15rem" ml=".9rem">
                {/* Google logo */}
                <FaGoogle
                  color="white"
                  size="2.25rem"
                  onClick={() => handleActiveIcons("google")}
                />
              </Box>
            </Box>
            <Box textAlign="center" placeSelf="center">
              {/* vector bg image*/}
              <Image
                src={
                  isActiveDiscord ? "social-bg-dark.svg" : "social-bg-light.svg"
                }
                alt=""
                ml="0.15rem"
                w="4rem"
                color="black"
              />
              <Box position="absolute" mt="-3.15rem" ml="1rem">
                {/* discord logo */}
                <FaDiscord
                  color="white"
                  size="2.25rem"
                  onClick={() => handleActiveIcons("discord")}
                />
              </Box>
            </Box>
          </HStack>
        </GridItem>
        <GridItem my="-1.5rem">
          <Input
            type={isActiveGoogle ? "email" : "text"}
            placeholder={isActiveGoogle ? "Add Gmail" : "Discord Username"}
            color="#89DCFF"
            autoComplete="off"
            {...register("username", {
              required: "cannot be blank",
              minLength: {
                value: 1,
                message: "cannot be blank",
              },
              validate: emailValidation,
            })}
          />
          <Box mt="-1.5rem" mb="1rem">
            <ErrorMessage
              errors={errors}
              name="username"
              render={({ message }) => {
                return (
                  <Box>
                    <Alert status="error" variant="left-accent">
                      <AlertIcon />
                      <Text mr={1}>
                        {isActiveGoogle ? "Email" : "Username"}
                      </Text>
                      {message}
                    </Alert>
                  </Box>
                );
              }}
            />
          </Box>
        </GridItem>
      </SimpleGrid>
      <Box mx="-1.5rem" mt="2rem">
        <Button onClick={() => handleReivew()} variant="formGray">
          Review
        </Button>
      </Box>
    </Box>
  );
};

export default TransferForm;
