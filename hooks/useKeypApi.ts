import axios from "axios";
import { endpointLogic, requestType } from "../utils/general";

const KEYP_API_DOMAIN = process.env.NEXT_PUBLIC_KEYP_API_DOMAIN || "https://api.usekeyp.com"; 
const KEYP_API_BASE_URL = `${KEYP_API_DOMAIN}/v1`;

/**
 * @remarks - This hook is used to fetch data from the Keyp API
 * @param endpointType - possible endpoints: onramps | offramps | users | usersbalance | tokensTransfers | tokensBalance
 * @returns
 */
const UseKeypApi = async (
  endpointType: string,
  variables: string,
  accessToken: string
) => {
  const endpoint = endpointLogic(endpointType, variables);
  const method = requestType(endpointType);

  const headers = {
    "Content-type": "application/json",
    Authorization: "Bearer " + accessToken,
  };

  const fetchData = await axios({
    method,
    headers,
    url: `${KEYP_API_BASE_URL}/${endpoint}`,
  })
    .then((response) => {
      // console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      return error;
    });

  return fetchData;
};

export default UseKeypApi;
