import { Box, Button, Flex, Heading, Input } from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { useFormContext } from "context/FormContext";
import AssetBalance from "./AssetBalance";
import { useState, useEffect, useRef } from "react";
import { ErrorMessage } from "@hookform/error-message";
import RoundedButton from "./RoundedButton";

const Amount = ({ goToStep, isActive }: { goToStep?: any; isActive?: any }) => {
  const [balanceError, setBalanceError] = useState(false);
  const { amount, setAmount, asset } = useFormContext();
  const localForm = useForm<FieldValues>();
  const {
    getValues,
    register,
    watch,
    trigger,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = localForm;

  const values = getValues();
  watch();

  useEffect(() => {
    if (balanceError) {
      setError("amount", { type: "custom", message: "Insufficient balance" });
    } else {
      clearErrors("amount");
    }
  }, [balanceError, setError, clearErrors]);

  useEffect(() => {
    if (isActive) {
      const inputElement = document.querySelector('input[name="amount"]');
      if (inputElement) {
        (inputElement as HTMLInputElement).focus();
      }
    }
  }, [isActive]);

  const handleAmount = async (): Promise<void> => {
    const valid = await trigger();
    if (valid) {
      const stateUpdates = () => {
        setAmount(values.amount);
      };
      stateUpdates();
      goToStep(1);
    }

    return;
  };

  const amountValidation = (n: any) => {
    const numericAmount = Number(n);
    if (numericAmount <= 0) return "Value must be greater than 0";
    // if (numericAmount > balance) {
    //   setBalanceError(true);
    //   return "Insufficient balance";
    // }
    setBalanceError(false);
    return true;
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
      <Flex justifyContent="flex-end" height="24px">
        <ErrorMessage
          errors={errors}
          name="amount"
          render={({ message }) => {
            return (
              <Box display={message ? "block" : "none"} color="#E45200">
                {message}
              </Box>
            );
          }}
        />
      </Flex>
      <Flex>
        <Input
          {...register("amount", {
            value: amount,
            required: {
              value: true,
              message: `Enter asset amount`,
            },
            pattern: {
              value: /^[0-9.,]*$/, // only allows numeric input
              message: "You can only enter numeric value",
            },
            validate: amountValidation,
          })}
          placeholder={"0"}
          _placeholder={{ color: "#155A11", opacity: 1 }}
          sx={{
            "&:focus": {
              borderColor: "initial",
              boxShadow: "none",
            },
          }}
          onKeyPress={(event) => {
            if (!/[0-9,.]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          inputMode="numeric"
          mb="8px"
          height="64px"
          bg="rgba(255, 255, 255, 0.8)"
          fontSize="24px"
          fontWeight="700"
          borderTopRightRadius="0px"
          borderBottomRightRadius="0px"
          border="none"
          paddingRight="9px"
          textAlign="right"
          color="#155A11"
        />
        <Box
          bg="rgba(255, 255, 255, 0.8)"
          fontSize="24px"
          fontWeight="700"
          color="#155A11"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="64px"
          borderTopRightRadius="8px"
          borderBottomRightRadius="8px"
          paddingRight="16px"
          onClick={() => goToStep(4)}
        >
          {asset}
        </Box>
      </Flex>
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
          onClick={() => goToStep(4)}
          mixBlendMode="multiply"
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
