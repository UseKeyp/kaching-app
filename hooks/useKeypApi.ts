import axios from "axios";
import { endpointLogic, requestType } from "../utils/general";

const KEYP_API_BASE_URL = "https://api.usekeyp.com/v1";

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
