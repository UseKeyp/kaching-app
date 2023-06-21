import { Button } from "@chakra-ui/react";
import  React  from "react";
import Icon from "./Icon";

interface SocialButtonProps {
  name: string;
  platform: string
  handleActiveIcons: any
}

const SocialButton: React.FC<SocialButtonProps> = ({ name, platform, handleActiveIcons }) => {
  return (
    <Button
      display="flex"
      variant="unstyled"
      width="56px"
      borderRadius="100%"
      bg={"white"}
      opacity={platform === name ? "" : "0.4"}
      padding="10px"
      justifyContent="center"
      alignItems="center"
      height="56px"
      onClick={() => handleActiveIcons(name)}
    >
      <Icon
        name={name}
        width="35px"
        height="35px"
        disabled={platform === name}
      />
    </Button>
  );
};

export default SocialButton
