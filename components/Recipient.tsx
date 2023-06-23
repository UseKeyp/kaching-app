import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { useFormContext } from "context/FormContext";
import Icon from "./Icon";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import SocialButton from "./SocialButton";

interface RecipientProps {
  previousStep: () => void;
}

type Platform = 'google' | 'discord' | 'twitter' | 'twitch';

const Recipient: React.FC<RecipientProps> = ({ previousStep }) => {
  const { setPlatform, platform, type, setUsername, username } = useFormContext();
  const localForm = useForm<FieldValues>();
  const {
    getValues,
    register,
    watch,
    trigger,
    formState: { errors, isValid },
  } = localForm;

  const values = getValues();
  watch();

  const handleActiveIcons = (platform: Platform): void => {
    setPlatform(platform);
  };

  const handleRecipient = async (): Promise<void> => {
    const valid = await trigger();
    if (valid) {
      const stateUpdates = () => {
        setUsername(values.username);
      };
      stateUpdates();
      previousStep();
    }

    return;
  };

  const emailValidation = (val: string) => {
    if (platform === "google") {
      return val.includes("@") || "Oops. Thats not a Gmail address.";
    } else {
      return val.includes("#") || "Oops. Thats not a Discord address.";
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
      >
        Send to
      </Heading>
      <Flex justifyContent="flex-end">
        <ErrorMessage
          errors={errors}
          name="username"
          render={({ message }) => {
            return (
              <Box
                display={message ? "block" : "none"}
                mt={message ? "-1rem" : "0"}
                position="relative"
                zIndex={1}
                color="#E45200"
              >
                {message}
              </Box>
            );
          }}
        />
      </Flex>
      <Input
        {...register("username", {
          value: username,
          required: "Cannot be blank",
          minLength: {
            value: 1,
            message: "Cannot be blank",
          },
          validate: emailValidation,
        })}
        type={platform === "google" ? "email" : "text"}
        placeholder={platform === "google" ? "Add Gmail" : "Discord Username"}
        mb="24px"
        height="64px"
        bg="rgba(255, 255, 255, 0.8)"
        fontSize="24px"
        fontWeight="400"
        _placeholder={{ color: "#155A11", opacity: 1 }}
      />
      <Flex mb="107px" justifyContent="space-between">
        <SocialButton name="google" platform={platform} handleActiveIcons={handleActiveIcons}/>
        <SocialButton name="discord" platform={platform} handleActiveIcons={handleActiveIcons}/>
        <SocialButton name="twitter" platform={platform} handleActiveIcons={handleActiveIcons}/>
        <SocialButton name="twitch" platform={platform} handleActiveIcons={handleActiveIcons}/>
      </Flex>
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
        onClick={() => handleRecipient()}
        disabled
      >
        <Text>Confirm Recipient</Text>
        <Box ml="auto">
          <Icon name="arrowRight" color={isValid ? "white" : "#0D7007"} />
        </Box>
      </Button>
    </Flex>
  );
};

export default Recipient;
