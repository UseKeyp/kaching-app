import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState, ReactNode } from "react";
import { useFormContext } from "context/FormContext";
import { UserBalance } from "types/keypEndpoints";
import { supportedAssets } from "utils/general";

const BalanceContext = React.createContext({
  balance: "",
  error: null,
  loading: false,
});

type BalanceProviderProps = {
  children: ReactNode;
};

export const BalanceProvider: React.FC<BalanceProviderProps> = ({
  children,
}) => {
  const [userAssets, setUserAssets] = useState<UserBalance | undefined>();

  const { data: session } = useSession();
  const { asset } = useFormContext();
  const [balance, setBalance] = useState(""); // change to number
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const tokenAddress = supportedAssets[asset];

  const fetchBalance = async () => {
    try {
      const ACCESS_TOKEN = session?.user.accessToken;
      const userId = session?.user.id;
      const options = {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      };

      const urlMATIC = `https://api.usekeyp.com/v1/users/${userId}/balance`;
      const urlNotMATIC = `https://api.usekeyp.com/v1/users/${userId}/balance/${tokenAddress}`;
      const response = await axios.get(
        asset === "MATIC" ? urlMATIC : urlNotMATIC,
        options
      );
      console.log("responce balanceContext", response.data);
      const contractAddress = Object.keys(response.data)[0]; // Get the first key from the object
      const formattedBalance = response.data[contractAddress].formatted;
      setBalance(Number(formattedBalance).toFixed(4));
    } catch {
      console.error(error);
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchBalance();
    }
    // eslint-disable-next-line
  }, [session, asset]);

  return (
    <BalanceContext.Provider value={{ balance, error, loading }}>
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
