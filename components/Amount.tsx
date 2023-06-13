import {
  Box,
  Button,
  Flex,
  FormErrorMessage,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { useFormContext } from "context/FormContext";
import Icon from "./Icon";
import AssetBalance from "./AssetBalance";
import { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";

const RoundedButton = ({ isValid, onClick, text }) => {
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

const Amount = ({
  nextStep,
  previousStep,
}: {
  nextStep?: any;
  previousStep?: any;
}) => {
  const [balanceError, setBalanceError] = useState(false);
  const { amount, setAmount } = useFormContext();
  const localForm = useForm<FieldValues>();
  const {
    getValues,
    register,
    watch,
    trigger,
    formState: { errors, isValid },
  } = localForm;
  const token = "USDC";
  const amountValidation = (val: string) => {
    return;
  };

  const values = getValues();
  watch();

  const handleAmount = async (): Promise<void> => {
    const valid = await trigger();
    if (valid) {
      const stateUpdates = () => {
        setAmount(values.amount);
      };
      stateUpdates();
      previousStep();
    }

    return;
  };

  return (
    <Flex flexDirection="column">
      <Heading
        as="h2"
        fontWeight="700"
        fontSize="40px"
        color="#33912E"
        textTransform="capitalize"
        mb="24px"
      >
        Amount
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
        textAlign="right"
        {...register("amount", {
          required: "Cannot be blank",
          minLength: {
            value: 1,
            message: "Cannot be blank",
          },
          validate: amountValidation,
        })}
        placeholder={amount ? `${amount} USDC` : `0 ${token}`}
        mb="8px"
        height="64px"
        bg="rgba(255, 255, 255, 0.8)"
        fontSize="24px"
        fontWeight="700"
        _placeholder={{ color: "#155A11", opacity: 1 }}
      />
      <Flex alignItems="flex-start" justifyContent="space-between" mb="24px">
        <AssetBalance setBalanceError={setBalanceError} />
        <Button
          display="flex"
          alignItems="flex-start"
          variant="unstyled"
          fontSize="13px"
          fontWeight="700"
          color="#B0B6C1"
          height="21px"
        >
          Change Token
        </Button>
      </Flex>
      <RoundedButton
        isValid={isValid}
        onClick={handleAmount}
        text="Confirm Amount"
      />
    </Flex>
  );
};

export default Amount;
