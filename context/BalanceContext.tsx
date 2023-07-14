import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState, ReactNode } from "react";
import { useFormContext } from "context/FormContext";
import { UserBalance, AssetBalance } from "types/keypEndpoints";
import { KEYP_BASE_URL_V1, supportedAssets } from "utils/general";

const initialBalances = {
  MATIC: {symbol: "MATIC"},
  USDC: {symbol: "USDC"},
  DAI: {symbol: "DAI"},
  WETH: {symbol: "WETH"},
};

const BalanceContext = React.createContext({
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
  // const tokenAddress = supportedAssets[asset];

  const fetchBalance = () => {
    setLoading(true);

    const ACCESS_TOKEN = session?.user.accessToken;
    const userId = session?.user.id;
    const options = {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };

    const firstRequest = `${KEYP_BASE_URL_V1}/users/${userId}/balance`;
    const daiRequest = `${KEYP_BASE_URL_V1}/users/${userId}/balance/${supportedAssets.DAI}`;
    const wethRequest = `${KEYP_BASE_URL_V1}/users/${userId}/balance/${supportedAssets.WETH}`;

    axios
      .all([
        axios.get(firstRequest, options),
        axios.get(daiRequest, options),
        axios.get(wethRequest, options),
      ])
      .then(
        axios.spread((firstResponse, daiResponse, wethResponse) => {
          let DAI = Object.values(daiResponse.data);
          let WETH = Object.values(wethResponse.data);

          let balanceData = {
            ...firstResponse.data,
            DAI: DAI[0],
            WETH: WETH[0],
          };
          setBalance(balanceData);
          setLoading(false);
          setError(null);
        })
      )
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setError(error);
      });
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
