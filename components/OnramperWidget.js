import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Box } from "@chakra-ui/react";
import Loading from "./Loading";

const OnramperWidget = () => {
  const session = useSession();
  const [onramperUrl, setOnramperUrl] = useState("");
  const router = useRouter();
  const { query } = router;

  const ONRAMPER_API_KEY = process.env.NEXT_PUBLIC_ONRAMPER_API_KEY;
  const address = session?.data?.user?.address;

  useEffect(() => {
    if (!address || !router.query || onramperUrl) return;
    const network = "POLYGON";
    const params = {
      apiKey: process.env.ONRAMPER_API_KEY,
      onlyCryptoNetworks: network,
      isAddressEditable: false,
      wallets: `${network}:${address}`,
    };

    const urlParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        urlParams.append(key, value);
      }
    });
    const url = new URL("https://buy.onramper.com");
    url.search = urlParams.toString();

    setOnramperUrl(url);
  }, [router.query, address]);

  return (
    <Box className="onramper-container" textAlign="center">
      {onramperUrl ? (
        <Box
          as="iframe"
          src={onramperUrl}
          border="1px solid"
          borderColor="#58585f"
          m="auto"
          borderRadius="16px"
          height="630px"
          width="100%"
          maxWidth="420px"
          title="Onramper widget"
          allow="accelerometer; autoplay; camera; gyroscope; payment"
        />
      ) : (
        <Loading />
      )}
      {!ONRAMPER_API_KEY && "(Onramper API Key not found)"}
    </Box>
  );
};

export default OnramperWidget;
