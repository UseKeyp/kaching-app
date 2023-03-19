import React, { createContext, ReactNode, useContext, useState } from "react";

export const FormContext = createContext<{
  // TODO: Fix types on useState setter functions
  isActiveGoogle: boolean;
  setIsActiveGoogle: any;
  isActiveDiscord: boolean;
  setIsActiveDiscord: any;
  inReview: boolean;
  setInReview: any;
  confirmation: boolean;
  setConfirmation: any;
  type: string;
  setType: any;
  amount: number | undefined;
  setAmount: any;
  asset: string | undefined;
  setAsset: any;
  username: string | undefined;
  setUsername: any;
  handleHomePage: any;
}>({
  isActiveGoogle: true,
  setIsActiveGoogle: null,
  isActiveDiscord: false,
  setIsActiveDiscord: null,
  inReview: false,
  setInReview: null,
  confirmation: false,
  setConfirmation: null,
  type: "send",
  setType: null,
  amount: undefined,
  setAmount: null,
  asset: undefined,
  setAsset: null,
  username: undefined,
  setUsername: null,
  handleHomePage: undefined,
});
interface FormProviderProps {
  children: ReactNode;
}
export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [type, setType] = useState("send");
  const [inReview, setInReview] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [isActiveGoogle, setIsActiveGoogle] = useState(true);
  const [isActiveDiscord, setIsActiveDiscord] = useState(false);
  const [amount, setAmount] = useState<number | undefined>();
  const [asset, setAsset] = useState<string>("MATIC");
  const [username, setUsername] = useState<string | undefined>();

  // TODO: fix return type. Without "return" it throws an error
  const handleHomePage = (): void => {
    console.log("home");
    setType("send");
    setInReview(false);
    setConfirmation(false);
    setIsActiveGoogle(true);
    setIsActiveDiscord(false);
    setAmount(undefined);
    setAsset("MATIC");
    setUsername(undefined);
  };

  const value = {
    type,
    setType,
    isActiveGoogle,
    setIsActiveGoogle,
    isActiveDiscord,
    setIsActiveDiscord,
    amount,
    setAmount,
    asset,
    setAsset,
    username,
    setUsername,
    inReview,
    setInReview,
    confirmation,
    setConfirmation,
    handleHomePage,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useFormContext = () => {
  const {
    type,
    setType,
    isActiveGoogle,
    setIsActiveGoogle,
    isActiveDiscord,
    setIsActiveDiscord,
    amount,
    setAmount,
    asset,
    setAsset,
    username,
    setUsername,
    inReview,
    setInReview,
    confirmation,
    setConfirmation,
    handleHomePage,
  } = useContext(FormContext);

  return {
    type,
    setType,
    isActiveGoogle,
    setIsActiveGoogle,
    isActiveDiscord,
    setIsActiveDiscord,
    amount,
    setAmount,
    asset,
    setAsset,
    username,
    setUsername,
    inReview,
    setInReview,
    confirmation,
    setConfirmation,
    handleHomePage,
  };
};
