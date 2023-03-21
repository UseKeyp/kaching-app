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
    const btnValues = ["Send", "Request", "Fund", "Cash Out"];

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

  const handleScroll = (dir: string) => {
    const container = document.getElementById("container");
    const send = document.getElementById("send");
    const request = document.getElementById("request");
    const fund = document.getElementById("fund");
    const cashOut = document.getElementById("cashout");

    const sendStart = send?.getBoundingClientRect().left;
    const requestStart = request?.getBoundingClientRect().left;
    const fundStart = fund?.getBoundingClientRect().left;
    const cashOutStart = cashOut?.getBoundingClientRect().left;

    // left click actions
    if (dir === "left") {
      if (type === "cashout") {
        container?.scrollBy({
          left: fundStart,
          behavior: "smooth",
        });
        setType("fund");
      } else if (type === "fund") {
        container?.scrollBy({
          left: requestStart && requestStart,
          behavior: "smooth",
        });
        setType("request");
      } else if (type === "request") {
        container?.scrollBy({
          left: sendStart && sendStart - 100,
          behavior: "smooth",
        });
        setType("send");
      }
    }

    // right click actions
    if (dir === "right") {
      if (type === "send") {
        container?.scrollBy({
          left: requestStart && requestStart + 25,
          behavior: "smooth",
        });
        setType("request");
      } else if (type === "request") {
        container?.scrollBy({
          left: fundStart && fundStart,
          behavior: "smooth",
        });
        setType("fund");
      } else if (type === "fund") {
        container?.scrollBy({
          left: cashOutStart,
          behavior: "smooth",
        });
        setType("cashout");
      }
    }
  };

  return (
    <Flex
      display={renderReviewPage ? "none" : "flex"}
      direction="row"
      px="1rem"
      py="1rem"
    >
      {/* left arrow clickable image */}
      <Box
        display={type === "send" ? "none" : "block"}
        alignSelf="center"
        // transform="translateX(-0.5rem)"
        zIndex={1}
        onClick={() => handleScroll("left")}
        w="fit-content"
      >
        <Image
          src="arrow-right.gif"
          alt=""
          transform="rotate(180deg)"
          opacity={0.5}
          w={["6rem", "3rem"]}
        />
      </Box>
      {/* scrollable buttons */}
      <HStack
        pl={type === "send" ? "1rem" : "0rem"}
        id="container"
        overflowX="scroll"
        fontSize="1rem"
        py="1rem"
        mx="-2rem"
      >
        {renderButtons()}
      </HStack>
      {/* box for right arrow */}
      <Flex
        display={type === "cashout" ? "none" : "block"}
        transform="translateX(0.5rem)"
        alignSelf="center"
        zIndex={1}
        onClick={() => handleScroll("right")}
      >
        <Image
          src="arrow-right.gif"
          alt=""
          opacity={0.5}
          w={["6rem", "3rem"]}
        />
      </Flex>
    </Flex>
  );
};

export default TransactionSlider;
