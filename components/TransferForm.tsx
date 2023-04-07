import React, { useEffect, useState } from "react";
import {
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
import { FieldValues, useForm } from "react-hook-form";
import { FaDiscord, FaGoogle } from "react-icons/fa";
import AssetModal from "./AssetModal";
import { useFormContext } from "../context/FormContext";
import ButtonSpacingWrapper from "./ButtonSpacingWrapper";
import AssetBalance from "./AssetBalance";
import { inputColorLogicErrors } from "utils/general";
import ToPlatformSelection from "./ToPlatformSelection";

/**
 * @remarks - this component renders a form that allows user to send a transaction. ButtonSpacingWrapper is used to make sure the Review button stays at the bottom of the page
 * @returns div containing a form
 */
const TransferForm = () => {
  const [balanceError, setBalanceError] = useState(false);
  const {
    type,
    setAmount,
    platform,
    setPlatform,
    setUsername,
    setRenderTxPage,
    setRenderReviewPage,
  } = useFormContext();

  const localForm = useForm<FieldValues>();
  const {
    getValues,
    register,
    setError,
    clearErrors,
    watch,
    trigger,
    formState: { errors },
  } = localForm;

  const values = getValues();
  watch();

  const emailValidation = (val: string) => {
    if (platform === "google") {
      return val.includes("@gmail.com") || "must be valid gmail address";
    } else {
      return val.includes("#") || "must be valid discord address";
    }
  };

  const handleReivew = async (): Promise<void> => {
    const stateUpdates = () => {
      setAmount(values.amount),
        setUsername(values.username),
        setRenderTxPage(false);
      setRenderReviewPage(true);
    };
    const valid = await trigger();
    if (type === "send" && valid) {
      stateUpdates();
    } else if (type === "request") {
      stateUpdates();
    }
  };

  useEffect(() => {
    if (balanceError) {
      setError("amount", { type: "custom", message: "Insufficient balance" });
    } else {
      clearErrors("amount");
    }
  }, [balanceError, setError, clearErrors]);

  return (
    <ButtonSpacingWrapper isTransactionSlider={true}>
      <SimpleGrid columns={1} spacing={"1rem"}>
        <GridItem>
          <Box
            display={type === "request" ? "none" : "block"}
            color="errorOrange"
            fontWeight="normal"
            fontSize="1.25rem"
          >
            <ErrorMessage
              errors={errors}
              name="amount"
              render={({ message }) => {
                return (
                  <Box
                    display={message ? "block" : "none"}
                    ml="0.5rem"
                    mb="-2rem"
                    position="relative"
                    zIndex={1}
                  >
                    {message}
                  </Box>
                );
              }}
            />
          </Box>

          <Box position="relative" mt={balanceError ? "1rem" : 0}>
            <Input
              type="number"
              step={0.1}
              placeholder="0.00"
              color={inputColorLogicErrors(errors, type)}
              autoComplete="off"
              {...register("amount", {
                required: {
                  value: true,
                  message: `Enter asset amount`,
                },
                onChange: (e) => setAmount(e.target.value),
                validate: (n) => n > 0 || "Value must be greater than 0",
              })}
            />
          </Box>
        </GridItem>
        <GridItem px={"0.5rem"} py={1} alignContent="center">
          <HStack spacing="1rem" justifyContent="space-between">
            <AssetModal />
            <Box pt={3}>
              <AssetBalance setBalanceError={setBalanceError} />
            </Box>
          </HStack>
        </GridItem>
        <GridItem>
          <ToPlatformSelection />
        </GridItem>
        <GridItem>
          <Box color="errorOrange" fontWeight="normal" fontSize="1.25rem">
            <ErrorMessage
              errors={errors}
              name="username"
              render={({ message }) => {
                return (
                  <Box
                    display={message ? "block" : "none"}
                    mt={message ? "-1rem" : "0"}
                    ml="0.5rem"
                    mb="-2rem"
                    position="relative"
                    zIndex={1}
                  >
                    {platform === "google" ? "Email" : "Username"} {message}
                  </Box>
                );
              }}
            />
          </Box>
          <Box position="relative" mt={!errors.username ? "-2rem" : "-1rem"}>
            <Input
              type={platform === "google" ? "email" : "text"}
              placeholder={
                platform === "google" ? "Add Gmail" : "Discord Username"
              }
              color={errors.username ? "errorEmailRed" : "#89DCFF"}
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
          </Box>
        </GridItem>
      </SimpleGrid>
      <Box mt="2rem" mx="-1.5rem" mb="-1.0rem">
        <Button onClick={() => handleReivew()} variant="formGray">
          Review
        </Button>
      </Box>
    </ButtonSpacingWrapper>
  );
};

export default TransferForm;
