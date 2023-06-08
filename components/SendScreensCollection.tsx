import { useState } from "react";
import StepWizard from "react-step-wizard";
import Amount from "./Amount";
import Recipient from "./Recipient";
import SendForm from "./SendForm";

const SendScreensCollection = () => {
  const [formState, updateFormState] = useState({});

  const updateForm = (updatedData) => {
    updateFormState({ ...formState, ...updatedData });
  };

  return (
    <StepWizard>
      <SendForm state={formState} />
      <Recipient update={updateForm} />
      <Amount update={updateForm} />
    </StepWizard>
  );
};

export default SendScreensCollection;
