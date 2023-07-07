import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import Icon from "./Icon";

interface RoundedButtonProps {
  isValid?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  arrow?: boolean;
  text?: string;
  isLoading?: any;
  loadingText?: any;
  type?: string;
}

const RoundedButton: React.FC<RoundedButtonProps> = ({
  isValid,
  onClick,
  text,
  arrow = true,
  isLoading,
  loadingText,
  type,
}) => {
  const getColor = () => {
    if (isValid) {
      return "white";
    } else if (type === "logout") {
      return "#E45200";
    } else {
      return "#0D7007";
    }
  };

  console.log("btn is valid? ", isValid);
  return (
    <Button
      isLoading={isLoading}
      loadingText={loadingText}
      bg={isValid ? "#0D7007" : "transparent"}
      color={getColor()}
      border={`2px solid ${type === "logout" ? "#E45200" : "#0D7007"}`}
      type="submit"
      display="flex"
      variant="unstyled"
      width="100%"
      borderRadius="40px"
      height="64px"
      fontSize="24px"
      px="24px"
      py="16px"
      onClick={onClick}
      _focusVisible={{
        boxShadow: "none",
      }}
      _active={{ bg: "none" }}
    >
      <Text>{text}</Text>
      {arrow && (
        <Box ml="auto">
          <Icon name="arrowRight" color={getColor()} />
        </Box>
      )}
    </Button>
  );
};

export default RoundedButton;
