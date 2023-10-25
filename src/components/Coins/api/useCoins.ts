import axios from "axios";
import { useQuery } from "react-query";

interface CoinData {
  id: string;
  is_active: boolean;
  is_new: boolean;
  name: string;
  rank: number;
  symbol: string;
  type: CoinData;
}

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
  });

  return { data, ...rest };
};
