import axios from "axios";
import { useQuery } from "react-query";
import { CoinData, CoinDetail } from "../types";

export const getCoins = (): Promise<CoinDetail[]> => {
  return axios
    .get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&limit=100&sparkline=false"
    )
    .then((res) => res.data);
};

export const useCoins = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["coins"],
    queryFn: getCoins,
    suspense: true,
  });

  return { data, ...rest };
};
