import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { FieldValues, useForm, watch } from "react-hook-form";
import { useFormContext } from "context/FormContext";
import Icon from "./Icon";

/**
 * @remarks component gets rendered onto TransferForm component. Nested boxes are in place for styling purposes
 * @returns component that lets user select whether to enter Google or Discord username
 */

const Recipient = ({ nextStep, previousStep }) => {
  const { setPlatform, platform, type, setUsername } = useFormContext();
  const localForm = useForm<FieldValues>();
  const {
    getValues,
    register,
    setError,
    clearErrors,
    watch,
    trigger,
    formState: { errors, isValid },
  } = localForm;

  const values = getValues();
  watch();

  const handleActiveIcons = (platform: string): void => {
    if (platform === "google") {
      setPlatform("google");
    } else {
      setPlatform("discord");
    }
  };

  const handleRecipient = async (): Promise<void> => {
    const valid = await trigger();

    const stateUpdates = () => {
      setUsername(values.username);
    };
    stateUpdates();
    previousStep();
    return;
  };

  return (
    <Box fontFamily="satoshi">
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
      <Input
        {...register("username")}
        type={platform === "google" ? "email" : "text"}
        placeholder={platform === "google" ? "Add Gmail" : "Discord Username"}
        mb="24px"
        height="64px"
        bg="rgba(255, 255, 255, 0.8)"
        fontSize="24px"
        fontWeight="400"
        _placeholder={{ color: "#155A11", opacity: 1 }}
      />
      <Flex mb="107px">
        <Button
          variant="unstyled"
          width="56px"
          borderRadius="100%"
          bg="white"
          padding="10px"
          justifyContent="center"
          alignItems="center"
          height="56px"
          mr="34px"
          onClick={() => handleActiveIcons("google")}
        >
          <Icon name="google" width="35px" height="35px" />
        </Button>
        <Button
          variant="unstyled"
          width="56px"
          borderRadius="100%"
          bg="white"
          padding="10px"
          justifyContent="center"
          alignItems="center"
          height="56px"
          onClick={() => handleActiveIcons("discord")}
        >
          <Icon name="discord" width="35px" height="27px" />
        </Button>
      </Flex>
      <Button
        type="submit"
        variant="unstyled"
        width="343px"
        border="2px solid #0D7007"
        borderRadius="40px"
        height="64px"
        bg="transparent" // change if enabled
        fontSize="24px"
        color="#0D7007"
        px="24px"
        py="16px"
        onClick={()=> handleRecipient()}
        disabled
      >
        Confirm
      </Button>
    </Box>
  );
};

export default Recipient;
