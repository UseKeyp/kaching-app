import { Box, Button, Flex, Heading, Input } from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { useFormContext } from "context/FormContext";
import AssetBalance from "./AssetBalance";
import { useEffect } from "react";
import { ErrorMessage } from "@hookform/error-message";
import RoundedButton from "./RoundedButton";
import { useBalance } from "context/BalanceContext";
import { UserBalance } from "types/keypEndpoints";

const Amount = ({ goToStep, isActive }: { goToStep?: any; isActive?: any }) => {
  const { balances } = useBalance();
  const { amount, setAmount, asset } = useFormContext();
  const localForm = useForm<FieldValues>();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = localForm;

  watch();

  useEffect(() => {
    if (isActive) {
      const inputElement = document.querySelector('input[name="amount"]');
      if (inputElement) {
        (inputElement as HTMLInputElement).focus();
      }
    }
  }, [isActive]);

  const handleAmount = (data: any) => {
    setAmount(data.amount);
    goToStep(1);
  };

  const amountValidation = (n: any) => {
    const numericAmount = Number(n);
    const assetData = (balances as UserBalance)[asset];
    if (numericAmount <= 0) {
      return "Value must be greater than 0";
    }
    if (assetData) {
      const numericBalance = Number(assetData.formatted);
      if (numericBalance < numericAmount) {
        return "Insufficient balance";
      }
    } else {
      return "Balance is not available yet";
    }
    return true;
  };

  return (
    <Flex flexDirection="column" width="343px" mx="auto">
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
      <Box
        display="flex"
        alignItems="center"
        mb="8px"
        height="64px"
        bg="rgba(255, 255, 255, 0.8)"
        borderRadius="8px"
      >
        <Input
          {...register("amount", {
            value: amount,
            required: {
              value: true,
              message: `Enter asset amount`,
            },
            pattern: {
              value: /^[0-9.]*$/, // only allows numeric input
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
            if (!/[0-9.]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          inputMode="decimal"
          fontSize="24px"
          fontWeight="700"
          borderTopRightRadius="0px"
          borderBottomRightRadius="0px"
          border="none"
          borderWidth={0}
          borderStyle="none"
          paddingRight="9px"
          textAlign="right"
          color="#155A11"
          flexGrow="1"
          bg="rgba(255, 255, 255, 0.0)"
        />
        <Box
          fontSize="24px"
          fontWeight="700"
          color="#155A11"
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderTopRightRadius="8px"
          borderBottomRightRadius="8px"
          paddingRight="16px"
          onClick={() => goToStep(4)}
        >
          {asset}
        </Box>
      </Box>
      <Flex alignItems="flex-start" justifyContent="space-between" mb="24px">
        <AssetBalance />
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
      <Flex>
        <Box mr="8px">
          <RoundedButton
            text="Cancel"
            arrow={false}
            onClick={() => goToStep(1)}
          />
        </Box>
        <RoundedButton
          isValid={isValid}
          onClick={handleSubmit(handleAmount)}
          text="Confirm"
        />
      </Flex>
    </Flex>
  );
};

export default Amount;
