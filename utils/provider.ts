import { Wallet, providers } from "ethers";

const sigProviders: any = {
  "1337": new Wallet(
    process.env.NEXT_PUBLIC_MINTER_PRIVATE_KEY!,
    new providers.JsonRpcProvider("http://127.0.0.1:8545/")
  ),
  "80001": new Wallet(
    process.env.NEXT_PUBLIC_MINTER_PRIVATE_KEY!,
    new providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_PROVIDER)
  ),
  "137": new Wallet(
    process.env.NEXT_PUBLIC_MINTER_PRIVATE_KEY!,
    new providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_PROVIDER)
  ),
};

const Providers: any = {
  "1337": new providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_PROVIDER!),
  "80001": new Wallet(
    process.env.NEXT_PUBLIC_MINTER_PRIVATE_KEY!,
    new providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_PROVIDER)
  ),
  "137": new Wallet(
    process.env.NEXT_PUBLIC_MINTER_PRIVATE_KEY!,
    new providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_PROVIDER)
  ),
};

export { Providers, sigProviders };
