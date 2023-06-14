import { Box, Button, Flex, Heading, Input } from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { useFormContext } from "context/FormContext";
import AssetBalance from "./AssetBalance";
import { useState, useEffect } from "react";
import { ErrorMessage } from "@hookform/error-message";
import RoundedButton from "./RoundedButton";

const Amount = ({ goToStep }: { goToStep?: any }) => {
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
  const token = "USDC";

  const values = getValues();
  watch();

  useEffect(() => {
    if (balanceError) {
      setError("amount", { type: "custom", message: "Insufficient balance" });
    } else {
      clearErrors("amount");
    }
  }, [balanceError, setError, clearErrors]);

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
      <Flex justifyContent="flex-end">
        <ErrorMessage
          errors={errors}
          name="amount"
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
      <Flex>
        <Input
          color="#155A11"
          textAlign="right"
          {...register("amount", {
            required: {
              value: true,
              message: `Enter asset amount`,
            },
            validate: amountValidation,
          })}
          placeholder={amount ? `${amount}` : `0`}
          mb="8px"
          height="64px"
          bg="rgba(255, 255, 255, 0.8)"
          fontSize="24px"
          fontWeight="700"
          onChange={(e) => setAmount(Number(e.target.value))}
          _placeholder={{ color: "#155A11", opacity: 1 }}
          borderTopRightRadius="0px"
          borderBottomRightRadius="0px"
          border="none"
          paddingRight="9px"
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
