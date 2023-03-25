import React, { createContext, ReactNode, useContext, useState } from "react";

export const FormContext = createContext<{
  // TODO: Fix types on useState setter functions
  isActiveGoogle: boolean;
  setIsActiveGoogle: any;
  isActiveDiscord: boolean;
  setIsActiveDiscord: any;
  renderTxPage: boolean;
  setRenderTxPage: any;
  renderReviewPage: boolean;
  setRenderReviewPage: any;
  isConfirming: boolean;
  setIsConfirming: any;
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
  renderTxPage: true,
  setRenderTxPage: null,
  renderReviewPage: false,
  setRenderReviewPage: null,
  isConfirming: false,
  setIsConfirming: null,
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
  const [renderTxPage, setRenderTxPage] = useState(true);
  const [renderReviewPage, setRenderReviewPage] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isActiveGoogle, setIsActiveGoogle] = useState(true);
  const [isActiveDiscord, setIsActiveDiscord] = useState(false);
  const [amount, setAmount] = useState<number | undefined>();
  const [asset, setAsset] = useState<string>("MATIC");
  const [username, setUsername] = useState<string | undefined>();

  // TODO: fix return type. Without "return" it throws an error
  const handleHomePage = () => {
    setType("send");
    setRenderTxPage(true);
    setRenderReviewPage(false);
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
    renderTxPage,
    setRenderTxPage,
    renderReviewPage,
    setRenderReviewPage,
    isConfirming,
    setIsConfirming,
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
    renderTxPage,
    setRenderTxPage,
    renderReviewPage,
    setRenderReviewPage,
    isConfirming,
    setIsConfirming,
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
    renderTxPage,
    setRenderTxPage,
    renderReviewPage,
    setRenderReviewPage,
    isConfirming,
    setIsConfirming,
    handleHomePage,
  };
};
