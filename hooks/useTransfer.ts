import axios from "axios";

interface UseTransferProps {
  data: {
    toAddress: string;
    tokenAddress: string;
    tokenType: string;
    amount: number;
  };
}
/**
 * Hook returns data from Keyp API for transfer requests
 *
 * @remarks
 * @param toAddress - the ERC20 address of the person receiving payment
 * @param tokenAddress - token contract address
 * @param tokenType - either ERC20 or ERC720
 * @returns
 */
const useTransfer = ({ data }: UseTransferProps) => {
  const requestUrl = "https://api.usekeyp.com/v1";
  const key = process.env.Keyp_;
  const clientId = process.env.KEYP_CLIENT_ID;

  const fetchData = axios({
    method: "post",
    url: "requestUrl/tokens/transfers/",
    data,
  }).then((response) => response.data);

  console.log(fetchData);
  return fetchData;
};

export default useTransfer;
