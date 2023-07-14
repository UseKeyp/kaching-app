import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState, ReactNode } from "react";
import { useFormContext } from "context/FormContext";
import { KEYP_BASE_URL_V1, supportedAssets } from "utils/general";
import UseKeypApi from "../hooks/useKeypApi";

const initialBalances = {
  MATIC: { symbol: "MATIC" },
  USDC: { symbol: "USDC" },
  DAI: { symbol: "DAI" },
  WETH: { symbol: "WETH" },
};

type BalanceContextType = {
  balances: any,
  error: Error | null,
  loading: boolean,
};

const BalanceContext = React.createContext<BalanceContextType>({
  balances: initialBalances,
  error: null,
  loading: false,
});

type BalanceProviderProps = {
  children: ReactNode;
};

export const BalanceProvider: React.FC<BalanceProviderProps> = ({
  children,
}) => {
  const [balances, setBalance] = useState(initialBalances);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const { asset } = useFormContext();

  const fetchBalance = async () => {
    setLoading(true);

    const ACCESS_TOKEN = session?.user.accessToken;
    const userId = session?.user.id;

    const firstRequest = `${KEYP_BASE_URL_V1}/users/${userId}/balance`;
    const daiRequest = `${KEYP_BASE_URL_V1}/users/${userId}/balance/${supportedAssets.DAI}`;
    const wethRequest = `${KEYP_BASE_URL_V1}/users/${userId}/balance/${supportedAssets.WETH}`;
    try {
      const [firstResponse, daiResponse, wethResponse] = await Promise.all([
        UseKeypApi({
          accessToken: ACCESS_TOKEN,
          method: "GET",
          endpointUrl: firstRequest,
        }),
        UseKeypApi({
          accessToken: ACCESS_TOKEN,
          method: "GET",
          endpointUrl: daiRequest,
        }),
        UseKeypApi({
          accessToken: ACCESS_TOKEN,
          method: "GET",
          endpointUrl: wethRequest,
        }),
      ]);

      let DAI = Object.values(daiResponse);
      let WETH = Object.values(wethResponse);

      let balanceData = {
        ...firstResponse,
        DAI: DAI[0],
        WETH: WETH[0],
      };
      setBalance(balanceData);
      setLoading(false);
      setError(null);
    } catch (e: any) {
      console.error(e);
      setLoading(false);
      setError(e);
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchBalance();
    }
    // eslint-disable-next-line
  }, [session, asset]);
  return (
    <BalanceContext.Provider value={{ balances, error, loading }}>
      {children}
    </BalanceContext.Provider>
  );
};

export function useBalance() {
  const context = React.useContext(BalanceContext);

  if (context === undefined) {
    throw new Error("useBalance must be used within a BalanceProvider");
  }

  return context;
}
