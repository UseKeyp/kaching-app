import { Box } from "@chakra-ui/react";
import StepWizard from "react-step-wizard";
import Amount from "./Amount";
import Recipient from "./Recipient";
import SendForm from "./SendForm";

const SendScreensCollection = () => {
  return (
    <Box width="100%">
      <StepWizard className="wizard">
        <SendForm />
        <Recipient />
        <Amount />
      </StepWizard>
    </Box>
  );
};

export default SendScreensCollection;
