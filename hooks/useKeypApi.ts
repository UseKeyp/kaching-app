import axios from "axios";
import { Transfers } from "../types/Transfers";
import { endpointLogic, requestType } from "../utils/general";

const KEYP_API_BASE_URL = "https://api.usekeyp.com/v1";

/**
 * @remarks - This hook is used to fetch data from the Keyp API
 * @param accessToken - passed into headers
 * @param endpointType - possible endpoints: onramps | offramps | users | usersbalance | tokenTransfers | tokensBalance
 * @param variables - get passed into endpoint URL
 * @param data - (optional) arguments for request data
 * @returns
 */
const UseKeypApi = async (
  accessToken: string | undefined | null,
  endpointType: string,
  variables?: string | null,
  data?: Transfers
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
    data,
  })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      return error;
    });

  return fetchData;
};

export default UseKeypApi;
