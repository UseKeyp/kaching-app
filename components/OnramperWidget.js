import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { useSession } from "next-auth/react";
import {
    Box,
  } from "@chakra-ui/react";
  import Loading from "./Loading";

const OnramperWidget = () => {
    const session = useSession();
    const [onramperUrl, setOnramperUrl] = useState('')
    const router = useRouter();
    const { query } = router;

    const ONRAMPER_API_KEY= process.env.NEXT_PUBLIC_ONRAMPER_API_KEY
    const address = session?.data?.user?.address

    useEffect(() => {
        if (!address || !router.query || onramperUrl) return
        const network = router.query.network || "POLYGON"
        const params = {
            apiKey: process.env.ONRAMPER_API_KEY,
            onlyCryptos: router.query.currency || "USDC_POLYGON",
            onlyNetwork: network,
            isAddressEditable: false,
            wallets: `${network}:${address}`
        };

        const urlParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value) {
                urlParams.append(key, value);
            }
        });
        const url = new URL('https://buy.onramper.com');
        url.search = urlParams.toString();

        setOnramperUrl(url)
    }, [router.query, address])

    return (
        <Box className="onramper-container"textAlign="center" >
            {onramperUrl ? (<iframe
                style={{ borderRadius: '16px', border: '1px solid #58585f', margin: 'auto', maxWidth: '420px' }}
                src={onramperUrl}
                height="630px"
                width="347px"
                title="Onramper widget"
                allow="accelerometer; autoplay; camera; gyroscope; payment">
            </iframe>) : <Loading/>}
            {!ONRAMPER_API_KEY && "(Onramper API Key not found)"}
        </Box>
    )
}

export default OnramperWidget