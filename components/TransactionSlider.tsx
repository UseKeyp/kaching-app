import React, { useEffect } from "react";
import { Box, Button, Flex, HStack, Image } from "@chakra-ui/react";
import { useFormContext } from "../context/FormContext";
import { useSizeProvider } from "../context/SizeContext";

/**
 * @remarks - this component is used to determine the "type" of transaction
 * @param setTxSliderHeight - sets the height of the transaction slider. Index.tsx takes this value and passes it to other components to calculate the height of the page
 * @returns - div containing scrollable buttons
 */
const TransactionSlider = () => {
  const { setType, type, renderReviewPage, isConfirming } = useFormContext();
  const { setTxSliderHeight } = useSizeProvider();

  const handletype = (e: any) => {
    setType(e.target.id);
  };

  const renderButtons = () => {
    const btnValues = [
      "Send",
      "Request",
      "Fund",
      "Cash Out",
      // "Play"
    ];

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

  useEffect(() => {
    const txSliderHeight = document.getElementById("txSlider")?.clientHeight;
    setTxSliderHeight(txSliderHeight || 0);
  }, [setTxSliderHeight]);

  return (
    <Flex
      display={renderReviewPage || isConfirming ? "none" : "flex"}
      direction="row"
      mx="-1rem"
      id="txSlider"
    >
      <Box zIndex={1} w={["5rem", "5rem", "5rem", "3rem"]}>
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
