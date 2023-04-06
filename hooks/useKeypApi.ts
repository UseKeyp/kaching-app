import axios from "axios";
import { useSession } from "next-auth/react";
import { UrlParams1, Endpoints } from "types/keypEndpoints";
import { Transfers } from "../types/Transfers";
import { generateEndpointUrl } from "../utils/general";

interface UseKeypApiProps {
  method: "GET" | "POST";
  endpoints: Endpoints;
  urlParams1?: UrlParams1;
  urlParams2?: string | null;
  data?: Transfers;
}

/**
 * @remarks - This hook is used to fetch data from the Keyp API
 * @param method - request type
 * @param endpoints - endpoint
 * @param urlParam1
 * @param urlParam2
 * @param data - (optional) arguments for request data
 * @returns
 */
const UseKeypApi = async ({
  method,
  endpoints,
  urlParams1,
  urlParams2,
  data,
}: UseKeypApiProps) => {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;
  const endpoint = generateEndpointUrl(endpoints, urlParams1, urlParams2);

  const headers = {
    "Content-type": "application/json",
    Authorization: "Bearer " + accessToken,
  };

  const fetchData = await axios({
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

  return fetchData;
};

export default UseKeypApi;
