import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";


const Recipient = ({ nextStep, previousStep, update }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    update(data);
    nextStep();
  };

  return (
    <Box onSubmit={handleSubmit(onSubmit)}>
        <p>step 2</p>
      <Input {...register("recipient")} placeholder="Recipient" />
      <Button type="submit">Confirm</Button>
    </Box>
  );
};

export default Recipient