import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import PuzzleNFT from "../../artifacts/contracts/PuzzleNFT.sol/PuzzleNFT.json";
import { sigProviders } from '../../utils/provider';

const mint = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = new ethers.Contract(
    '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    PuzzleNFT.abi,
    sigProviders['1337']
  );
  const recipient = req.query.recipient;
  const response = await token.mint(recipient, "1");
  console.log("response: ", JSON.stringify(response));
  return res.status(200).json({ success: true, recipient });
};

export default mint;
