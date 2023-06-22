export type Transactions = {
  type: string;
  to?: {
    username?: string;
    platform?: string;
    address: string;
  };
  amount?: {
    type: string;
    value: string;
    valueBn: {
      type: string;
      hex: string;
    };
    formatted: string;
    decimals: number;
    symbol: string;
    name: string;
    tokenAddress: string | null;
    network: string;
    chainId: number;
  };
  timestamp: string;
  hash: string;
  explorerUrl: string;
  contractAddress?: string;
  methodName?: string;
};
