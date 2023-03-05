import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Dispatch, useState } from "react";

interface AssetModalProps {
  setGetAsset: Dispatch<any>;
  inReview: boolean;
}

/**
 * @remarks modal opens when user clicks on asset name
 * @param setGetAsset useState hook variable that captures string of asset
 * @returns modal that renders a list of assets
 */
const AssetModal: React.FC<AssetModalProps> = ({ setGetAsset, inReview }) => {
  const [selectedAsset, setSelectedAsset] = useState("USDC");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClickedAsset = (asset: string) => {
    setSelectedAsset(asset);
  };
  console.log("inReview", inReview);
  const handleDone = () => {
    console.log("handleDone");
    setGetAsset(selectedAsset);
    onClose();
  };

  // TODO: get list of assets from API and render those instead
  const assets = ["ETH", "MATIC", "USDC", "XDAI"];
  const renderAssets = assets.map((asset) => {
    return (
      <Box
        onClick={() => handleClickedAsset(asset)}
        fontSize="80px"
        fontWeight="extra"
        key={asset}
        color={selectedAsset === asset ? "#F4AB00" : "#C2C2C2"}
      >
        <Text>{asset}</Text>
      </Box>
    );
  });

  return (
    <>
      <Button
        onClick={() => onOpen()}
        isDisabled={inReview}
        fontSize="80px"
        color="#F4AB00"
        variant="none"
        mt={6}
        p={0}
      >
        {selectedAsset}
      </Button>
      <Box mt={"1.5rem"}>
        <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalBody
              fontSize="80px"
              fontFamily="sharpie"
              fontWeight="extrabold"
              color="#C2C2C2"
            >
              {renderAssets}
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => handleDone()}
                color="#1499DA"
                border="solid #1499DA 1px"
                fontSize="80px"
                lineHeight="96px"
                py={"3rem"}
                w="full"
              >
                Done
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default AssetModal;
