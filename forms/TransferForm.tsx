import {
  Box,
  Button,
  GridItem,
  HStack,
  Input,
  Link,
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
  const [isActiveGoogle, setIsActiveGoogle] = useState(false);
  const [isActiveDiscord, setIsActiveDiscord] = useState(true);
  const {
    type,
    setType,
    setAmount,
    setAsset,
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
      }
    } else if (platform === "discord") {
      if (!isActiveDiscord) {
        setIsActiveDiscord(true);
        setIsActiveGoogle(false);
      }
    }
  };

  const handleReivew = async () => {
    if (isValid) {
      setInReview(true);
    }
  };

  useEffect(() => {
    setValue("asset", getAsset);
  }, [getAsset, setValue]);

  return (
    <Box display={inReview ? "none" : ""}>
      <HStack>
        <Button
          onClick={() => setType("send")}
          variant="none"
          fontFamily="sharpie"
          fontSize="60px"
          color="#1499DA"
          opacity={type === "send" ? 1 : 0.5}
        >
          Send
        </Button>

        <Button
          onClick={() => setType("request")}
          variant="none"
          fontFamily="sharpie"
          fontSize="60px"
          color="#1499DA"
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
            placeholder="$0.00"
            color="#99DA67"
            {...register("amount", {
              required: "Cannot be blank",
              min: 0,
            })}
          />
        </GridItem>
        <GridItem px={"0.5rem"}>
          <AssetModal setGetAsset={setGetAsset} />
        </GridItem>
        <GridItem>
          <HStack justifyContent="space-around" px="0.5rem">
            <Box w="33%" my={"-0.5rem"}>
              <Text color="#63676F" fontSize="80px" fontWeight="extrabold">
                to
              </Text>
            </Box>
            <Box w="34%" textAlign="center" placeSelf="center">
              {/* inner Box serves as a border for FaGoogle */}
              <Box
                w="min"
                border="1px"
                rounded="full"
                p={3}
                borderColor="#C5C8CC"
                bg={isActiveGoogle ? "#C5C8CC" : "white"}
              >
                <FaGoogle
                  color={isActiveGoogle ? "white" : "#C5C8CC"}
                  fontSize="56px"
                  onClick={() => handleActiveIcons("google")}
                />
              </Box>
            </Box>
            <Box w="34%" textAlign="center" placeSelf="center">
              <Box
                w="min"
                border="1px"
                rounded="full"
                p={3}
                borderColor="#C5C8CC"
                bg={isActiveDiscord ? "#C5C8CC" : "white"}
              >
                <FaDiscord
                  color={isActiveDiscord ? "white" : "#C5C8CC"}
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
            {...register("username", {
              required: "Cannot be blank",
              minLength: {
                value: 1,
                message: "cannot be blank",
              },
            })}
          />
          {/* TODO: Fix error message */}
          <ErrorMessage
            errors={errors}
            name="username"
            render={({ message }) => {
              return (
                <Box>
                  <Text fontSize="80px">{message}</Text>
                </Box>
              );
            }}
          />
        </GridItem>
        <GridItem>
          {/* <Link href={"/confirmation"}>
            <Button
              onClick={() => handleReivew()}
              variant="form"
              color="#1499DA"
            >
              Send!
            </Button>
          </Link> */}

          <Button onClick={() => handleReivew()} variant="form">
            Review
          </Button>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default TransferForm;
