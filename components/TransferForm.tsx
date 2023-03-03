import {
  Box,
  Button,
  GridItem,
  HStack,
  Input,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
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
  const localForm = useForm<FieldValues>();
  const { getValues, register, setValue } = localForm;
  const values = getValues();

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
              >
                <FaGoogle color="#C5C8CC" fontSize="56px" />
              </Box>
            </Box>
            <Box w="34%" textAlign="center" placeSelf="center">
              <Box
                w="min"
                border="1px"
                rounded="full"
                p={3}
                borderColor="#C5C8CC"
              >
                <FaDiscord color="#C5C8CC" fontSize="56px" />
              </Box>
            </Box>
          </HStack>
        </GridItem>
        <GridItem>
          <Input
            type="text"
            placeholder="Add Email"
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
          <Button
            variant="outline"
            shadow="lg"
            fontSize="80px"
            color="#C5C8CC"
            my="1rem"
            w="full"
            h="fit"
          >
            Review
          </Button>
        </GridItem>
      </SimpleGrid>
    </>
  );
};

export default TransferForm;
