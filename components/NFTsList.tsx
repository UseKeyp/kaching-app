import {
  Box,
  Flex,
  Heading,
  Image,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Text,
  PopoverArrow,
} from "@chakra-ui/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { KEYP_BASE_URL_V1, supportedAssets } from "utils/general";

interface Media {
  thumbnail?: string;
}

interface NFT {
  media?: Media[];
  title?: string;
  description?: string;
  tokenType?: string;
}

const NFTsList = () => {
  const [nftsList, setNftsList] = useState<Partial<NFT>[]>([]);
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  const { data: session } = useSession();

  const fetchNFTs = () => {
    const ACCESS_TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
    // const ACCESS_TOKEN = session?.user.accessToken;
    const userId = "0x3ab208D3CE512F2ac0Aa821Eecf2B816A96799B0"; // account with nfts
    // const userId = session?.user.id;
    const options = {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };

    // const getNft = `http://api.usekeyp.com/v1/nfts/${userId}`;
    const getNft = `http://localhost:4001/v1/nfts/${userId}`;

    axios
      .get(getNft, options)
      .then((response) => {
        console.log("nft", response.data);
        setNftsList(response.data.ownedNfts);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleNftClick = (index) => {
    setActiveTooltip(index);
    setTimeout(() => {
      setActiveTooltip(null);
    }, 10000);
  };

  useEffect(() => {
    if (session?.user) {
      fetchNFTs();
    }
    // eslint-disable-next-line
  }, [session]);

  console.log({ nftsList });
  return (
    <Box
      mx="auto"
      width="343px"
      fontFamily="satoshi"
      display={nftsList.length !== 0 ? "block" : "none"}
    >
      <Heading
        as="h2"
        fontFamily="satoshi"
        color="#0079AD"
        fontSize="16px"
        fontWeight="900"
        mb="8px"
      >
        NFTs
      </Heading>
      <Flex flexWrap="wrap" gap="25px">
        {nftsList.map((nft, index) => {
          return nft.media &&
            nft.media.length !== 0 &&
            nft.media[0].thumbnail ? (
            <Popover key={index} placement="auto-start">
              <PopoverTrigger>
                <Flex
                  width="96px"
                  height="96px"
                  justifyContent="center"
                  alignItems="center"
                  overflow="hidden"
                  borderRadius="6px"
                  onClick={() => handleNftClick(index)}
                >
                  <Image src={nft.media[0].thumbnail} alt={nft.title} />
                </Flex>
              </PopoverTrigger>
              <PopoverContent
                bg="white"
                color="black"
                border="none"
                borderColor="white"
                p={2}
                borderRadius="md"
                m="20px"
                _focusVisible={{ outline: "none" }}
              >
                <PopoverArrow />
                {nft.title && (
                  <Box>
                    <Text fontWeight="bold">Title:</Text>
                    <Text>{nft.title}:</Text>
                  </Box>
                )}

                {nft.tokenType && (
                  <Box>
                    <Text fontWeight="bold">Token Type:</Text>
                    <Text>{nft.tokenType}:</Text>
                  </Box>
                )}

                {nft.description && (
                  <Box>
                    <Text fontWeight="bold">Description:</Text>
                    <Text>{nft.description}</Text>
                  </Box>
                )}
              </PopoverContent>
            </Popover>
          ) : null;
        })}
      </Flex>
    </Box>
  );
};

export default NFTsList;
