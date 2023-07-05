/* eslint-disable */
import { Box } from "@chakra-ui/react";
import { createContext, useState } from "react";
import StepWizard from "react-step-wizard";
import Amount from "./Amount";
import Asset from "./Asset";
import Recipient from "./Recipient";
import SendForm from "./SendForm";
import Success from "./Success";

interface HashContextType {
  hash: string;
  setHash: React.Dispatch<React.SetStateAction<string>>;
}

export const HashContext = createContext<HashContextType | undefined>(undefined);

const SendScreensCollection = () => {
  const [hash, setHash] = useState("");

  return (
    <HashContext.Provider value={{ hash, setHash }}>
      <Box width="100%">
        <StepWizard className="wizard" isLazyMount={true}>
          {/* @ts-ignore */}
          <SendForm />
          {/* @ts-ignore */}
          <Recipient />
          {/* @ts-ignore */}
          <Amount />
          <Asset />
          {/* @ts-ignore */}
          <Success />
        </StepWizard>
      </Box>
    </HashContext.Provider>
  );
};

export default SendScreensCollection;
