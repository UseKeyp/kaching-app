import { Wallet, providers } from "ethers";

const sigProviders: any = {
    "1337" : new Wallet('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', new providers.JsonRpcProvider('http://127.0.0.1:8545/'))
};
  
const Providers : any = {
    "1337" : new providers.JsonRpcProvider('http://127.0.0.1:8545/'!)
}

export {
    Providers,
    sigProviders
}