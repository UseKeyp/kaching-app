import { useEffect, useState } from "react";
import { Image, Tooltip } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { Network, Alchemy } from "alchemy-sdk";
import styles from "./NFTWallet.module.css";

const settings = {
  apiKey: process.env.PUBLIC_NEXT_ALCHEMY_API_KEY,
  network: Network.MATIC_MAINNET,
};

const alchemy = new Alchemy(settings);

const PUZZLE_NFT_ADDRESS = process.env.NEXT_PUBLIC_PUZZLE_NFT_ADDRESS || "";

type WalletNFT = {
  description: string;
  NFTName: string;
  image: string;
};

export const NFTWallet = () => {
  const { data: session } = useSession();
  const [walletNFTs, setWalletNFTs] = useState<any>([]);
  const address = session && session.user.address;

  useEffect(() => {
    if (address) {
      refreshWallet();
    }
  }, [address]);

  const refreshWallet = async () => {
    const nfts = await fetchNFTs();
    if (nfts && nfts.ownedNfts.length > 0) {
      // setWalletNFTs([...nfts.ownedNfts]);
      setWalletNFTs(
        nfts.ownedNfts.map((nft: any): WalletNFT => {
          return {
            description: nft.description,
            NFTName: nft.title,
            image: nft.rawMetadata?.image,
          };
        })
      );
    }
  };

  const fetchNFTs = async () => {
    console.log(
      "fetching nfts for address: address",
      address,
      `PUZZLE_NFT_ADDRESS: ${PUZZLE_NFT_ADDRESS}`
    );
    const nfts = await alchemy.nft.getNftsForOwner(address as string, {
      contractAddresses: [PUZZLE_NFT_ADDRESS],
    });
    console.log("fetched nfts: ", nfts);
    return nfts;
  };
  console.log("walletNFTs: ", walletNFTs);

  return (
    <div className={styles.listContainer}>
      {(walletNFTs || []).map((nft: WalletNFT) => (
        <div className={styles.listItem} key={nft.NFTName}>
          <Tooltip label={nft.description} placement="top">
            <>
              <div
                className={styles.nftImage}
                style={{
                  backgroundImage: `url(${nft.image})`,
                }}
              ></div>
              <span className={styles.nftName}>{nft.NFTName}</span>
            </>
          </Tooltip>
        </div>
      ))}
    </div>
  );
};
