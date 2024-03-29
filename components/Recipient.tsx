import {
  Box,
  Flex,
  Heading,
  Input,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { useFormContext } from "context/FormContext";
import { ErrorMessage } from "@hookform/error-message";
import SocialButton from "./SocialButton";
import RoundedButton from "./RoundedButton";

interface RecipientProps {
  previousStep: () => void;
}

type Platform =
  | "GOOGLe"
  | "DISCORD"
  | "TWITTER"
  | "TWITCH"
  | "REDDIT"
  | "CHESS";

const Recipient: React.FC<RecipientProps> = ({ previousStep }) => {
  const { setPlatform, platform, setUsername, username } =
    useFormContext();
  const localForm = useForm<FieldValues>();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isValid },
  } = localForm;

  const [isLargerThan380] = useMediaQuery("(min-width: 380px)");

  watch();

  const handleActiveIcons = (platform: Platform): void => {
    setPlatform(platform);
  };

  const handleRecipient = (data:any) => {
    setUsername(data.username);
    previousStep();
  };

  const emailValidation = (val: string) => {
    if (platform === "GOOGLE") {
      return val.includes("@") || "Oops. Thats not a Gmail address.";
    }
  };

  const getPlatformPlaceholder = () => {
    switch (platform) {
      case "GOOGLE":
        return "Recipient Email";
      case "DISCORD":
        return "Discord Username";
      case "TWITTER":
        return "Twitter Username";
      case "TWITCH":
        return "Twitch Username";
      case "REDDIT":
        return "Reddit Username";
      case "CHESS":
        return "Chess.com Username";
    }
  };
  return (
    <Flex flexDirection="column">
      <Heading
        as="h2"
        fontWeight="700"
        fontSize="40px"
        color="#33912E"
        textTransform="capitalize"
        mb="40px"
        width="343px"
        mx="auto"
      >
        Send to
      </Heading>
      <Box overflowX={isLargerThan380 ? "unset" : "scroll"} pb="32px">
        <Flex
          gap="24px"
          minW="min-content"
          paddingLeft={isLargerThan380 ? "0" : "16px"}
          width={isLargerThan380 ? "343px" : ""}
          mx={isLargerThan380 ? "auto" : "0"}
          flexWrap={isLargerThan380 ? "wrap" : "nowrap"}
        >
          <SocialButton
            name="GOOGLE"
            platform={platform}
            handleActiveIcons={handleActiveIcons}
          />
          <SocialButton
            name="DISCORD"
            platform={platform}
            handleActiveIcons={handleActiveIcons}
          />
          <SocialButton
            name="TWITTER"
            platform={platform}
            handleActiveIcons={handleActiveIcons}
          />
          <SocialButton
            name="TWITCH"
            platform={platform}
            handleActiveIcons={handleActiveIcons}
          />
          <SocialButton
            name="REDDIT"
            platform={platform}
            handleActiveIcons={handleActiveIcons}
          />
          <SocialButton
            name="CHESS"
            platform={platform}
            handleActiveIcons={handleActiveIcons}
          />
        </Flex>
      </Box>
      <Flex justifyContent="flex-end" height="24px" width="343px" mx="auto">
        <ErrorMessage
          errors={errors}
          name="username"
          render={({ message }) => {
            return <Box color="#E45200">{message}</Box>;
          }}
        />
      </Flex>
      <Input
        {...register("username", {
          value: username,
          minLength: {
            value: 1,
            message: "Cannot be blank",
          },
          required: "Cannot be blank",
          validate: emailValidation,
        })}
        type={platform === "GOOGLE" ? "email" : "text"}
        placeholder={getPlatformPlaceholder()}
        mb="24px"
        height="64px"
        bg="rgba(255, 255, 255, 0.8)"
        fontSize="24px"
        fontWeight="400"
        _placeholder={{ color: "#155A11", opacity: 1 }}
        mx="auto"
        width="343px"
      />

      <Flex width="343px" mx="auto">
        <Box mr="8px">
          <RoundedButton text="Cancel" arrow={false} onClick={previousStep} />
        </Box>
        <RoundedButton
          isValid={isValid}
          type="submit"
          onClick={handleSubmit(handleRecipient)}
          text="Confirm"
        />
      </Flex>
    </Flex>
  );
};

export default Recipient;
