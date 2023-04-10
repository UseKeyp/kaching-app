import axios from "axios";
import { Endpoints, UrlParams1 } from "types/keypEndpoints";
import { Transfers } from "../types/Transfers";
import { generateEndpointUrl } from "../utils/general";

interface UseKeypApiProps {
  accessToken: string | undefined;
  method: "GET" | "POST";
  endpoints: Endpoints;
  urlParams1?: UrlParams1;
  urlParams2?: string | null;
  data?: Transfers;
}

/**
 * @remarks - This hook is used to fetch data from the Keyp API
 * @param accessToken - from session
 * @param method - request type
 * @param endpoints - endpoint
 * @param urlParams1
 * @param urlParams2
 * @param data - (optional) arguments for request data
 * @returns
 */
const UseKeypApi = async ({
  accessToken,
  method,
  endpoints,
  urlParams1,
  urlParams2,
  data,
}: UseKeypApiProps) => {
  const endpoint = generateEndpointUrl(endpoints, urlParams1, urlParams2);

  const headers = {
    "Content-type": "application/json",
    Authorization: "Bearer " + accessToken,
  };

  return await axios({
    method,
    headers,
    url: endpoint,
    data,
  })
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
};

export default UseKeypApi;
