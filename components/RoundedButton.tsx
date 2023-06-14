import { Box, Button, Text } from "@chakra-ui/react";
import  React  from "react";
import Icon from "./Icon";

interface RoundedButtonProps {
    isValid: boolean;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    text: string
}

const RoundedButton: React.FC<RoundedButtonProps> = ({ isValid, onClick, text }) => {
  return (
    <Button
      bg={isValid ? "#0D7007" : "transparent"}
      color={isValid ? "white" : "#0D7007"}
      type="submit"
      display="flex"
      variant="unstyled"
      width="100%"
      border="2px solid #0D7007"
      borderRadius="40px"
      height="64px"
      fontSize="24px"
      px="24px"
      py="16px"
      onClick={onClick}
      disabled
    >
      <Text>{text}</Text>
      <Box ml="auto">
        <Icon name="arrowRight" color={isValid ? "white" : "#0D7007"} />
      </Box>
    </Button>
  );
};

export default RoundedButton
