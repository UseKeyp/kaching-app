import React, { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import { useSizeProvider } from "../context/SizeContext";

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
  const { navHeight, txSliderHeight } = useSizeProvider();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      h={`calc(98vh - ${navHeight}px - ${
        isTransactionSlider ? txSliderHeight : 0
      }px)`}
    >
      {children}
    </Box>
  );
};

export default ButtonSpacingWrapper;
