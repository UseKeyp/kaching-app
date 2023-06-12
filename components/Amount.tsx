import { Button, Flex, Input } from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";

const Amount = ({ nextStep, previousStep, update }: { nextStep?: any, previousStep?: any, update: any }) => {
    const { register, handleSubmit } = useForm();
  
    const onSubmit = (data: FieldValues) => {
      update(data);
      nextStep();
    };
  
    return (
      <Flex onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("amount")} placeholder="$0" _placeholder={{ color: "#33912E", opacity: 1 }} />
        <Button type="submit">Confirm</Button>
      </Flex>
    );
  };

  export default Amount