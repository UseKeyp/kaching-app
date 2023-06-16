/* eslint-disable */
import { Box } from "@chakra-ui/react";
import StepWizard from "react-step-wizard";
import Amount from "./Amount";
import Asset from "./Asset";
import Recipient from "./Recipient";
import SendForm from "./SendForm";

const SendScreensCollection = () => {
  return (
    <Box width="100%" overflow="hidden">
      <StepWizard className="wizard">
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
