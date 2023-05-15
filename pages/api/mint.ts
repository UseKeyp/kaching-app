import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import PuzzleNFT from "../../artifacts/contracts/PuzzleNFT.sol/PuzzleNFT.json";
import { sigProviders } from "../../utils/provider";

const mint = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("minting from: ", process.env.NEXT_PUBLIC_MINTER_PRIVATE_KEY);
  const token = new ethers.Contract(
    process.env.NEXT_PUBLIC_PUZZLE_NFT_ADDRESS,
    PuzzleNFT.abi,
    sigProviders[process.env.NEXT_PUBLIC_NETWORK_CODE]
  );
  const recipient = req.query.recipient;
  try {
    // const response = await token.mint(recipient, "1", {
    //   gasPrice: 1786000000,
    //   gasLimit: 50000000,
    // });
    // const response = await token.mint(recipient, "1");
    const response = await token.mint(recipient, "1", { gasLimit: 5000000 });
    console.log("response: ", JSON.stringify(response));
    return res.status(200).json({ success: true, response: response });
  } catch (e: any) {
    console.log(JSON.stringify(e), e.message);
    return res.status(500).json({ success: false, response: e.message });
  }
};

export default mint;
