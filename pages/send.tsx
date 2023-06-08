import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import Icon from "components/Icon";
import React, { useState } from "react";
import AssetBalance from "components/AssetBalance";
import { FieldValues, useForm } from "react-hook-form";
import SendScreensCollection from "components/SendScreensCollection";

const Recipient = () => {
  // second screen
  // input for recipient
  // helpers buttons: when discord, validate input to fill discord username, when google, validate input to fill email address
  // confirm button -> onClick -> save value for input1 on screen 1 => go to screen 1
}

const Send = () => {
  const [balanceError, setBalanceError] = useState(false);

  return (<>
    <SendScreensCollection/>
  </>);
};

export default Send;
