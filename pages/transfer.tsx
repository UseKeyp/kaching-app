import { Button, HStack } from "@chakra-ui/react";
import Send from "components/Send";
import React, { useState } from "react";

/**
 * @remarks if user selects "send", render Send component, else render "Request"
 * @returns
 */
const Transfer = () => {
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
        >
          Send
        </Button>
        <Button
          onClick={() => setType("request")}
          variant="none"
          fontFamily="sharpie"
          fontSize="60px"
        >
          Request
        </Button>
      </HStack>
      {type === "send" && <Send />}
    </>
  );
};

export default Transfer;
