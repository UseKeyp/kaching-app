import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import PuzzleNFT from "../../artifacts/contracts/PuzzleNFT.sol/PuzzleNFT.json";
import { sigProviders } from '../../utils/provider';

const mint = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = new ethers.Contract(
    process.env.NEXT_PUBLIC_PUZZLE_NFT_ADDRESS,
    PuzzleNFT.abi,
    sigProviders[process.env.NEXT_PUBLIC_NETWORK_CODE]
  );
  const recipient = req.query.recipient;
  const response = await token.mint(recipient, "1");
  console.log("response: ", JSON.stringify(response));
  return res.status(200).json({ success: true, recipient });
};

export default mint;
