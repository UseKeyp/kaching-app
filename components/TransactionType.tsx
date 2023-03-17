import React, { useEffect, useState } from "react";
import { Box, Button, HStack } from "@chakra-ui/react";
import { useFormContext } from "../context/FormContext";
import { render } from "react-dom";

/**
 * @remarks - this component is used to determine the "type" of transaction. When user slides component, if it's within the constraints of 'container' id, the focused component gets brought into 'type' state
 * @returns - div containing scrollable buttons
 */
const TransactionType = () => {
  const [displayLeftArrow, setDisplayLeftArrow] = useState(false);
  const [displayRightArrow, setDisplayRightArrow] = useState(true);
  const { setType, type } = useFormContext();

  const handletype = (e: any) => {
    setType(e.target.id);
  };

  const renderButtons = () => {
    const btnValues = ["Send", "Request", "Fund", "Cash Out"];

    return btnValues.map((value) => {
      return (
        <Box key={value}>
          <Button
            onClick={handletype}
            id={value.toLowerCase()}
            variant="none"
            fontSize="60px"
            color="formBlueDark"
            opacity={type === value.toLowerCase() ? 1 : 0.5}
          >
            {value}
          </Button>
        </Box>
      );
    });
  };

  useEffect(() => {
    const container = document.getElementById("container");
    const containerPos = container?.getBoundingClientRect();
    const start = containerPos && containerPos?.left;
    const end = containerPos && containerPos?.width / 2;

    const send = document.getElementById("send");
    const sendPos = send?.getBoundingClientRect();

    const cashOut = document.getElementById("cashOut");
    const cashOutPos = cashOut?.getBoundingClientRect();

    // If id='send' aligns at start of 'container', display right arrow.
    if (sendPos && start && sendPos.x < start) {
      setDisplayLeftArrow(true);
    }
    // If 'cashOut'.left is < containerPos remove right arrow
    if (cashOutPos && end && cashOutPos?.right < containerPos.right) {
      setDisplayRightArrow(false);
    }
  }, [type, displayLeftArrow, displayRightArrow]);

  return (
    <>
      <HStack id="container" overflowX="scroll" py="1rem" w="450px">
        {renderButtons()}
      </HStack>
    </>
  );
};

export default TransactionType;
