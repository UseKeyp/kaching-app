import {
  Box,
  GridItem,
  HStack,
  Input,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { FaDiscord, FaGoogle } from "react-icons/fa";

/**
 *
 * @returns div containing a form
 */
const Send = () => {
  return (
    <>
      <SimpleGrid columns={[1, 2]} spacing={"2rem"} my={"2rem"}>
        <GridItem>
          <Input type="text" placeholder="$0.00" />
        </GridItem>
        <GridItem>
          <Input type="text" placeholder="USDC" />
        </GridItem>
        <GridItem>
          <HStack>
            <Box>To:</Box>
            <Box>
              <FaGoogle color="#C5C8CC" size="" />
            </Box>
            <Box>
              <FaDiscord color="#C5C8CC" />
            </Box>
          </HStack>
        </GridItem>
      </SimpleGrid>
    </>
  );
};

export default Send;
