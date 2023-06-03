import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import PuzzleNFT from "../../artifacts/contracts/PuzzleNFT.sol/PuzzleNFT.json";
import { sigProviders } from "../../utils/provider";

const mint = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = new ethers.Contract(
    process.env.NEXT_PUBLIC_PUZZLE_NFT_ADDRESS as string,
    PuzzleNFT.abi,
    sigProviders[process.env.NEXT_PUBLIC_NETWORK_CODE as string]
  );
  const recipient = req.query.recipient;
  try {
    const response = await token.mint(recipient, "1", {
      value: ethers.utils.parseEther("0"),
      gasPrice: ethers.utils.parseUnits("200", "gwei"),
    });
    return res.status(200).json({ success: true, response: response });
  } catch (e: any) {
    console.error(JSON.stringify(e), e.message);
    return res.status(500).json({ success: false, response: e.message });
  }
};

export default mint;
