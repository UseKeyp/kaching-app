import { useState } from "react";
import StepWizard from "react-step-wizard";
import Amount from "./Amount";
import Recipient from "./Recipient";
import SendForm from "./SendForm";

const SendScreensCollection = () => {
  return (
    <StepWizard>
      <SendForm />
      <Recipient />
      <Amount />
    </StepWizard>
  );
};

export default SendScreensCollection;
