import { Endpoints, UrlParams1 } from "types/keypEndpoints";

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
  urlParams2?: string
) => {
  const KEYP_BASE_URL_V1 = "https://api.usekeyp.com/v1";

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
        queryString = `${KEYP_BASE_URL_V1}/users/${urlParams1}/balance`;
        break;
      } else {
        queryString = `${KEYP_BASE_URL_V1}/users/${urlParams1}`;
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
