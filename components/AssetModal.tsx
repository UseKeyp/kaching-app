import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface AssetModalProps {
  localForm: UseFormReturn;
}

const AssetModal: React.FC<AssetModalProps> = ({ localForm }) => {
  const [selectedAsset, setSelectedAsset] = useState<undefined | string>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(localForm);
  const { setValue } = localForm;

  const handleClick = (asset: string) => {
    setSelectedAsset(asset);
    onClose();
  };

  const assets = ["ETH", "MATIC", "USDC", "XDAI"];
  const renderAssets = assets.map((asset) => {
    return (
      <Box
        onClick={() => handleClick(asset)}
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
        fontSize="80px"
        color="#F4AB00"
        variant="none"
        my={4}
        p={0}
      >
        {selectedAsset}
      </Button>
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
        </ModalContent>
      </Modal>
    </>
  );
};

export default AssetModal;
