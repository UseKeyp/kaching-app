import { Endpoints, UrlParams1 } from "types/keypEndpoints";

const KEYP_API_DOMAIN = process.env.NEXT_PUBLIC_KEYP_API_DOMAIN || "https://api.usekeyp.com"; 
const KEYP_BASE_URL_V1 = `${KEYP_API_DOMAIN}/v1`;

/**
 *
 * @param endpoints - value getting passed into Keyp api
 * @param urlParams1
 * @param urlParams2
 * @returns endpoint to be passed into Keyp API. Return value gets stored in queryString variable
 */
export const generateEndpointUrl = (
  endpoint: Endpoints,
  urlParams1?: UrlParams1,
  urlParams2?: string | null
) => {
  let queryString = "";
  switch (endpoint) {
    case "ramps":
      if (urlParams1 === "on") {
        queryString = `${KEYP_BASE_URL_V1}/ramps/on/${urlParams2}`;
        break;
      } else if (urlParams1 === "off") {
        queryString = `${KEYP_BASE_URL_V1}/ramps/off/${urlParams2}`;
        break;
      }
    case "users":
      if (urlParams2 === "balance") {
        queryString = `${KEYP_BASE_URL_V1}/users/${urlParams1}/balance/${urlParams2}`;
        break;
      } else {
        queryString = `${KEYP_BASE_URL_V1}/users/${urlParams1}/balance`;
        break;
      }
    case "tokens":
      if (urlParams1 === "transfers") {
        queryString = `${KEYP_BASE_URL_V1}/tokens/transfers`;
        break;
      } else if (urlParams1 === "balance") {
        queryString = `${KEYP_BASE_URL_V1}/balance/${urlParams2}`;
        break;
      }
  }
  return queryString;
};

export const blockExplorerLink = (hash: string) =>
  `https://polygonscan.com/tx/${hash}`;

// TODO: replace ETH address with WETH on Polygon
export const supportedAssets: { [k: string]: string } = {
  ETH: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
  DAI: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
  USDC: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
};

export const inputColorLogicErrors = (errors: any, type: string) => {
  if (type === "request") {
    return "formGreen";
  } else if (type === "send" && errors.amount) {
    return "errorEmailRed";
  } else {
    return "formGreen";
  }
};
