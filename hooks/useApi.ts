import axios from "axios";
import { endpointLogic, requestType } from "utils/general";

/**
 * @remarks - This hook is used to fetch data from the Keyp API
 * @param endpointType - possible endpoints: onramps | offramps | users | usersbalance | tokensTransfers | tokensBalance
 * @returns
 */
const useApi = async (endpointType: string, variables: string) => {
  const baseUrl = "https://api.usekeyp.com/v1";
  const KEY = process.env.NEXT_APP_KEYP_KEY;
  const TOKEN_SECRET = process.env.NEXT_PUBLIC_TOKEN_SECRET;
  const endpoint = endpointLogic(endpointType, variables);
  const method = requestType(endpointType);

  const headers = {
    "Content-type": "application/json",
    "x-api-key": TOKEN_SECRET,
    "x-client-id": TOKEN_SECRET,
    "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Credentials": "true",
    "access-control-allow-headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    Authorization: "Bearer " + TOKEN_SECRET,
  };

  const fetchData = await axios({
    method,
    headers,
    url: `${baseUrl}/${endpoint}`,
  })
    .then((response) => {
      console.log(response);
      response.data;
    })
    .catch((error) => error);

  console.log("fetchData", fetchData);
  return fetchData;
};

export default useApi;
