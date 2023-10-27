import axios from "axios";
import { useQuery } from "react-query";
import { CoinData } from "../types";

interface Coin {
  "24hVolume": string;
  btcPrice: string;
  change: string;
  coinrankingUrl: string;
  color: string;
  iconUrl: string;
  listedAt: number;
  lowVolume: boolean;
  marketCap: string;
  name: string;
  price: string;
  rank: number;
  sparkline: string[];
  symbol: string;
  tier: number;
  uuid: string;
}

interface Data {
  coins: Coin[];
}

interface CoinListResponseDto {
  data: Data;
}

const API_KEY = process.env.REACT_APP_MY_API_KEY;

export const getCoins = (): Promise<CoinListResponseDto> => {
  return axios
    .get("https://api.coinranking.com/v2/coins", {
      params: {
        key: "x-access-token",
        value: API_KEY,
      },
    })
    .then((res) => res.data);
};

export const useCoins = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["coins"],
    queryFn: getCoins,
    suspense: true,
  });

  return { data: data?.data.coins, ...rest };
};
