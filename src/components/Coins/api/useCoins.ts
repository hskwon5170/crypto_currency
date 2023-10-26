import axios from "axios";
import { useQuery } from "react-query";
import { CoinData } from "../types";

export const getCoins = (): Promise<CoinData[]> => {
  return axios
    .get("https://api.coinpaprika.com/v1/coins")
    .then((res) => res.data);
};

export const useCoins = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["coins"],
    queryFn: getCoins,
    select: (coins) => coins.slice(0, 100),
    suspense: true,
  });

  return { data, ...rest };
};
