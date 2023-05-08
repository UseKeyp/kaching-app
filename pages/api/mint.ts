import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import PuzzleNFT from "../../artifacts/contracts/PuzzleNFT.sol/PuzzleNFT.json";
const alchemyProvider = new ethers.AlchemyProvider(
  process.env.PUBLIC_NEXT_NETWORK || "maticmum",
  process.env.PUBLIC_NEXT_ALCHEMY_API_KEY
);
const defaultProvider = ethers.getDefaultProvider("localhost");
const signer = new ethers.Wallet(
  process.env.NEXT_PUBLIC_MINTER_PRIVATE_KEY as string,
  defaultProvider
);
const token = new ethers.Contract(
  process.env.NEXT_PUBLIC_PUZZLE_NFT_ADDRESS as string,
  PuzzleNFT.abi,
  signer
);

const getSignature = async () => {
  const msg = "I am the owner of the minter wallet";
  let signature = await signer.signMessage(msg);
  console.log(signature);
  return signature;
};

const mint = async (req: NextApiRequest, res: NextApiResponse) => {
  const recipient = req.body.recipient;
  const signature = await getSignature();
  const response = await token.mint(signature, "");
  console.log("response: ", JSON.stringify(response));
  return res
    .status(200)
    .json({ success: true, signature: signature, recipient });
};

export default mint;
