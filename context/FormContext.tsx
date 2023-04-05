import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useState,
} from "react";

export const FormContext = createContext<{
  isActiveGoogle: boolean;
  setIsActiveGoogle: Dispatch<boolean>;
  isActiveDiscord: boolean;
  setIsActiveDiscord: Dispatch<boolean>;
  renderTxPage: boolean;
  setRenderTxPage: Dispatch<boolean>;
  renderReviewPage: boolean;
  setRenderReviewPage: Dispatch<boolean>;
  isConfirming: boolean;
  setIsConfirming: Dispatch<boolean>;
  type: string;
  setType: Dispatch<string>;
  amount: number | undefined;
  setAmount: Dispatch<number | undefined>;
  asset: string | undefined;
  setAsset: Dispatch<string>;
  username: string | undefined;
  setUsername: Dispatch<string | undefined>;
  handleHomePage: any;
}>({
  isActiveGoogle: true,
  setIsActiveGoogle: useState,
  isActiveDiscord: false,
  setIsActiveDiscord: useState,
  renderTxPage: true,
  setRenderTxPage: useState,
  renderReviewPage: false,
  setRenderReviewPage: useState,
  isConfirming: false,
  setIsConfirming: useState,
  type: "send",
  setType: useState,
  amount: undefined,
  setAmount: useState,
  asset: undefined,
  setAsset: useState,
  username: undefined,
  setUsername: useState,
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
