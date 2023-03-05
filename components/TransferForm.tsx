import {
  Box,
  Button,
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
  const [getAsset, setGetAsset] = useState<string>();
  const [isActiveGoogle, setIsActiveGoogle] = useState(false);
  const [isActiveDiscord, setIsActiveDiscord] = useState(true);
  const localForm = useForm<FieldValues>();
  const { getValues, register, setValue, watch } = localForm;
  const values = getValues();
  watch();
  console.log(values);

  const handleActiveIcons = (platform: string): void => {
    // if user clicks on Google icon
    if (platform === "google") {
      if (!isActiveGoogle) {
        setIsActiveGoogle(true);
        setIsActiveDiscord(false);
      }
    } else if (platform === "discord") {
      // if discord is not toggled
      if (!isActiveDiscord) {
        setIsActiveDiscord(true);
        setIsActiveGoogle(false);
      }
    }
  };

  const checkEmailFormat = (email: string): Boolean => {
    let charArray = { "@": false, ".": false };
    for (let i = 0; i < email.length; i++) {
      if (email[i] === "@") {
        charArray["@"] = true;
      }
      if (email[i] === ".") {
        charArray["."] = true;
      }
    }
    const isEmail =
      charArray["@"] === true && charArray["."] === true ? true : false;
    return isEmail;
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
            placeholder="$0.00"
            variant="unstyled"
            fontSize="80px"
            color="#99DA67"
            px="0.5rem"
            fontWeight="extrabold"
            _placeholder={{
              color: "#99DA67",
              fontWeight: "extrabold",
            }}
            {...register("amount", {
              required: "Cannot be blank",
              min: 0,
            })}
          />
        </GridItem>
        <GridItem>
          <AssetModal setGetAsset={setGetAsset} />
        </GridItem>
        <GridItem>
          <HStack justifyContent="space-around" px="0.5rem">
            <Box w="33%">
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
            isDisabled={true}
            placeholder={isActiveGoogle ? "Add Email" : "Add Username"}
            variant="unstyled"
            fontSize="80px"
            color="#89DCFF"
            px="0.5rem"
            fontWeight="extrabold"
            _placeholder={{
              p: "0.5rem",
              color: "#89DCFF",
              fontWeight: "extrabold",
            }}
            {...register("email")}
          />
        </GridItem>
        <GridItem>
          <Link href="/confirmation">
            <Button variant="form">Review</Button>
          </Link>
        </GridItem>
      </SimpleGrid>
    </>
  );
};

export default TransferForm;
