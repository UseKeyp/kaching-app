import React from "react";
import { Box, Button, Flex, HStack, Image, Stack } from "@chakra-ui/react";
import { useFormContext } from "../context/FormContext";

/**
 * @remarks - this component is used to determine the "type" of transaction. When user slides component, if it's within the constraints of 'container' id, the focused component gets brought into 'type' state
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
    <Flex display={renderReviewPage ? "none" : "flex"} direction="row">
      <HStack
        id="container"
        overflowX="scroll"
        fontSize="1rem"
        py="2rem"
        spacing={-6}
      >
        {renderButtons()}
      </HStack>
    </Flex>
  );
};

export default TransactionSlider;
