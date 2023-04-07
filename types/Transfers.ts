export type Transfers = {
  toUsername: string;
  toUserProviderType: "GOOGLE" | "DISCORD";
  tokenAddress: string;
  tokenType: "ERC20";
  amount: string;
};
