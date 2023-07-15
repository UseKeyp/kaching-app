import axios from "axios";
import { Transfers } from "../types/Transfers";
import { signOut } from "next-auth/react";

interface UseKeypApiProps {
  accessToken: string | undefined;
  method: "GET" | "POST";
  endpointUrl: string;
  data?: Transfers;
}

/**
 * @remarks - This hook is used to fetch data from the Keyp API
 * @param accessToken - from session
 * @param method - request type
 * @param endpointUrl
 * @param endpoints - endpoint
 * @param urlParams1
 * @param urlParams2
 * @param data - (optional) arguments for request data
 * @returns
 */
const UseKeypApi = async ({
  accessToken,
  method,
  endpointUrl,
  data,
}: UseKeypApiProps) => {
  const headers = {
    "Content-type": "application/json",
    Authorization: "Bearer " + accessToken,
  };
  try {
    const response = await axios({
      method,
      headers,
      url: endpointUrl,
      data,
    });
    return response.data;
  } catch (e: any) {
    console.error(e.response);
    if (e.response.status === 401) {
      signOut({ callbackUrl: "/login" });
    }
    // throw e;
  }
};

export default UseKeypApi;
