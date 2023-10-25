import axios from "axios";
import { useQuery } from "react-query";
import { CoinResponseDto } from "../types";

export const getCoin = (coinId: string): Promise<CoinResponseDto> => {
  return axios
    .get(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
    .then((res) => res.data);
};

export const useCoin = (coinId: string) => {
  const { data, isLoading, ...rest } = useQuery({
    queryKey: ["coin", coinId],
    queryFn: () => getCoin(coinId),
    suspense: true,
  });

  return { data, isLoading, ...rest };
};
