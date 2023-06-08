import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Icon from "./Icon";

const Recipient = ({ nextStep, previousStep, update }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    update(data);
    nextStep();
  };

  return (
    <Box onSubmit={handleSubmit(onSubmit)} fontFamily="satoshi">
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
        {...register("recipient")}
        placeholder="Recipient"
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
        >
          <Icon name="discord" width="35px" height="27px" />
        </Button>
      </Flex>
      <Button
        type="submit"
        onClick={previousStep}
        variant="unstyled"
        width="343px"
        border="2px solid #0D7007"
        borderRadius="40px"
        height="64px"
        bg="transparent" // change if enabled
        fontSize="24px"
        fontFamily="satoshi"
        color="#0D7007"
        px="24px"
        py="16px"
        disabled
      >
        Confirm
      </Button>
    </Box>
  );
};

export default Recipient;
