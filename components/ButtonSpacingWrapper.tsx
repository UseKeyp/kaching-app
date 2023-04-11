import React, { ReactNode, useEffect, useState } from "react";
import { Box, useBreakpointValue } from "@chakra-ui/react";
// import { useSizeProvider } from "../context/SizeContext";

interface ButtonSpacingWrapperProps {
  children: ReactNode;
  isTransactionSlider: boolean;
}

/**
 *
 * @param children - components to be wrapped
 * @param isTransactionSlider - boolean to determine if txSliderHeight should be subtracted from the height of the wrapper
 * @returns - div that wraps the children components and ensures that the buttons are always at the bottom of the page
 */
const ButtonSpacingWrapper: React.FC<ButtonSpacingWrapperProps> = ({
  children,
  isTransactionSlider,
}) => {
  // const [boxHeight, setBoxHeight] = useState<string>();
  // const { navHeight, txSliderHeight } = useSizeProvider();

  // useEffect(() => {
  //   const height = `calc(100vh - ${navHeight}px - ${
  //     isTransactionSlider ? txSliderHeight : 0
  //   }px)`;
  //   setBoxHeight(height);
  // }, [children, navHeight, txSliderHeight, isTransactionSlider]);

  // const breakValue = useBreakpointValue("400px");

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      fontSize="9vh"
      // h={`${boxHeight}px`}
      maxH="88vh"
      minH={isTransactionSlider ? "74vh" : "88vh"}
    >
      {children}
    </Box>
  );
};

export default ButtonSpacingWrapper;
