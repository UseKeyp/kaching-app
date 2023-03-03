import React, { ReactNode, useState } from "react";
import { Button, HStack } from "@chakra-ui/react";
import Send from "components/TransferForm";
import TransferForm from "components/TransferForm";

/**
 * @remarks if user selects "send", render Send component, else render "Request"
 * @returns
 */
interface HomeProps {
  children?: ReactNode;
}

// TODO: if user is not logged in, redirect to login page
const Home: React.FC<HomeProps> = () => {
  const [type, setType] = useState("send");
  const [amount, setAmount] = useState(0);
  const [asset, setAsset] = useState<string>();
  const [platform, setPlatform] = useState<string>();
  const [email, setEmail] = useState<string>();

  return (
    <>
      <HStack>
        <Button
          onClick={() => setType("send")}
          variant="none"
          fontFamily="sharpie"
          fontSize="60px"
          color="#1499DA"
          opacity={type === "send" ? 1 : 0.5}
        >
          Send
        </Button>
        <Button
          onClick={() => setType("request")}
          variant="none"
          fontFamily="sharpie"
          fontSize="60px"
          color="#1499DA"
          opacity={type === "request" ? 1 : 0.5}
        >
          Request
        </Button>
      </HStack>
      <TransferForm type={type} />
    </>
  );
};

export default Home;
