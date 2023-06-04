import { useEffect, useState } from "react";
import { Tooltip } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { Network, Alchemy } from "alchemy-sdk";
import styles from "./NFTWallet.module.css";

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.MATIC_MAINNET,
};

const alchemy = new Alchemy(settings);

const PUZZLE_NFT_ADDRESS = process.env.NEXT_PUBLIC_PUZZLE_NFT_ADDRESS || "";

type WalletNFT = {
  description: string;
  NFTName: string;
  image: string;
  tokenId: string;
  address: string;
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
            image: (nft.rawMetadata?.image || "").replace(
              "ipfs://",
              "https://ipfs.io/ipfs/"
            ),
            tokenId: nft.tokenId,
            address: nft.contract.address,
          };
        })
      );
    }
  };

  const fetchNFTs = async () => {
    const nfts = await alchemy.nft.getNftsForOwner(address as string, {
      contractAddresses: [PUZZLE_NFT_ADDRESS],
    });
    return nfts;
  };

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
              >
                <a
                  className={styles.nftImageOverlay}
                  target="_blank"
                  rel="noreferrer"
                  href={`https://opensea.io/assets/matic/${nft.address}/${nft.tokenId}`}
                ></a>
              </div>
            </>
          </Tooltip>
        </div>
      ))}
    </div>
  );
};
