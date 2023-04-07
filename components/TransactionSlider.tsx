import React, { useEffect, useRef } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useFormContext } from "../context/FormContext";
import { useSizeProvider } from "../context/SizeContext";

/**
 * @remarks - this component is used to determine the "type" of transaction
 * @returns - div containing scrollable buttons
 */
const TransactionSlider = () => {
  const cleanedBtnValues = [
    "send",
    "request",
    "fund",
    "cashout",
    ];
  const btnValues = [
    "Send",
    "Request",
    "Fund",
    "Cash Out",
  ];
  const { setType, type, renderReviewPage, isConfirming } = useFormContext();
  const { setTxSliderHeight } = useSizeProvider();
  const scrollRef = useRef(null);

  const handleType = (value: any) => {
    const currentIndex = cleanedBtnValues.indexOf(type);
    const newIndex = cleanedBtnValues.indexOf(value.toLowerCase().replace(" ", ""));
    if (currentIndex > newIndex) {
        // @ts-ignore
        scrollRef.current.scrollLeft -= 275;
    } else if (currentIndex === newIndex) {

    } else {
      if (newIndex === 3) {
        // Cash Out needs more scroll
        // @ts-ignore
        scrollRef.current.scrollLeft += 255;
      } else {
        // @ts-ignore
        scrollRef.current.scrollLeft += 235;
      }
    }
    setType(value.toLowerCase().replace(" ", ""));
  };

  const renderButtons = () => {
    return (
        <Flex >
          {btnValues.map((value) => (
              <Box key={value}>
                <Button
                    py={"4rem"}
                    onClick={() => handleType(value)}
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
          ))}
        </Flex>
    );
  };



  useEffect(() => {
    const txSliderHeight = document.getElementById("txSlider")?.clientHeight;
    setTxSliderHeight(txSliderHeight || 0);
  }, [setTxSliderHeight]);

  return (
      <Flex
          display={renderReviewPage || isConfirming ? "none" : "fixed"}
          ref={scrollRef}
          px={["0rem", "0rem", "5rem"]}
          overflowX="scroll"
          direction="row"
          id="txSlider"
      >
        <Flex
            flex={1}
            justifyContent="center"
            alignItems="center"
            position="relative"
        >
          {renderButtons()}
        </Flex>
      </Flex>
  );

};

export default TransactionSlider;
