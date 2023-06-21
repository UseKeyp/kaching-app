/* eslint-disable */
import { Box } from "@chakra-ui/react";
import StepWizard from "react-step-wizard";
import Amount from "./Amount";
import Asset from "./Asset";
import Recipient from "./Recipient";
import SendForm from "./SendForm";

const SendScreensCollection = () => {
  
  return (
    <Box width="100%">
      <StepWizard className="wizard" isLazyMount={true}>
        {/* @ts-ignore */}
        <SendForm />
        {/* @ts-ignore */}
        <Recipient />
        {/* @ts-ignore */}
        <Amount />
        <Asset/>
      </StepWizard>
    </Box>
  );
};

export default SendScreensCollection;
