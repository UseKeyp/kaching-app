import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useState,
} from "react";

export const FormContext = createContext<{
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
  const [asset, setAsset] = useState<string>("");
  const [username, setUsername] = useState<string | undefined>();

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
  };
};
