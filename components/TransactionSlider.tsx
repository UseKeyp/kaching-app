import React from "react";
import { Box, Button, Flex, HStack, Image } from "@chakra-ui/react";
import { useFormContext } from "../context/FormContext";

/**
 * @remarks - this component is used to determine the "type" of transaction
 * @returns - div containing scrollable buttons
 */
const TransactionSlider = () => {
  const { setType, type, renderReviewPage } = useFormContext();

  const handletype = (e: any) => {
    setType(e.target.id);
  };

  const renderButtons = () => {
    const btnValues = ["Send", "Request", "Fund", "Cash Out", "Play"];

    return btnValues.map((value) => {
      return (
        <Box key={value}>
          <Button
            onClick={handletype}
            id={value.toLowerCase().replace(" ", "")}
            variant="none"
            fontSize="5rem"
            fontWeight="extrabold"
            color="formBlueDark"
            opacity={type === value.toLowerCase().replace(" ", "") ? 1 : 0.5}
          >
            {value}
          </Button>
        </Box>
      );
    });
  };

  return (
    <Flex
      display={renderReviewPage ? "none" : "flex"}
      direction="row"
      mx="-1rem"
    >
      <Box zIndex={1} w={["5rem"]}>
        <Image src="fade.png" alt="" w="100%" h="full" />
      </Box>
      <HStack overflowX="scroll" py="2rem" spacing={-6} mx="-4">
        {renderButtons()}
      </HStack>
      <Box zIndex={1}>
        <Image src="fade.png" alt="" transform="rotateY(180deg)" h="full" />
      </Box>
    </Flex>
  );
};

export default TransactionSlider;
