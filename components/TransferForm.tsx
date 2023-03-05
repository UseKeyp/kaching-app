import {
  Box,
  Button,
  FormErrorMessage,
  GridItem,
  HStack,
  Input,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FaDiscord, FaGoogle } from "react-icons/fa";
import AssetModal from "./AssetModal";

// TODO: refactor inputs so styles are put into custom Chakra theme component

interface TransferFormProps {
  type: string;
}
/**
 *
 * @returns div containing a form
 */
const TransferForm: React.FC<TransferFormProps> = ({ type }) => {
  const [getAsset, setGetAsset] = useState("USDC");
  const [isActiveGoogle, setIsActiveGoogle] = useState(false);
  const [isActiveDiscord, setIsActiveDiscord] = useState(true);
  const [inReview, setInReview] = useState(false);
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
  console.log(isValid, "isValid");

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

  // const checkEmailFormat = (email: string): Boolean => {
  //   let charArray = { "@": false, ".": false };
  //   for (let i = 0; i < email.length; i++) {
  //     if (email[i] === "@") {
  //       charArray["@"] = true;
  //     }
  //     if (email[i] === ".") {
  //       charArray["."] = true;
  //     }
  //   }
  //   const isEmail =
  //     charArray["@"] === true && charArray["."] === true ? true : false;
  //   return isEmail;
  // };

  const handleReivew = async () => {
    if (isValid) {
      setInReview(true);
    }
  };

  useEffect(() => {
    setValue("asset", getAsset);
  }, [getAsset, setValue]);

  return (
    <>
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
          <AssetModal setGetAsset={setGetAsset} inReview={inReview} />
        </GridItem>
        <GridItem>
          <HStack justifyContent="space-around" px="0.5rem">
            <Box w="33%" my={"-0.5rem"}>
              <Text
                color="#63676F"
                fontSize="80px"
                fontWeight="extrabold"
                opacity={inReview ? 0.4 : 1}
              >
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
              minLength: {
                value: 3,
                message: "cannot be blank",
              },
            })}
          />
          {/* <FormErrorMessage
            errors={errors}
            name="username"
            render={({ message }) => <FormErrorText message={message} />}
          /> */}
        </GridItem>
        <GridItem>
          {inReview && (
            <Link href={inReview ? "/confirmation" : ""}>
              <Button
                onClick={() => handleReivew()}
                variant="form"
                color="#1499DA"
              >
                Send!
              </Button>
            </Link>
          )}
          {!inReview && (
            <Button onClick={() => handleReivew()} variant="form">
              Review
            </Button>
          )}
        </GridItem>
      </SimpleGrid>
    </>
  );
};

export default TransferForm;
