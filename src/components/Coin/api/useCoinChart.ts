import axios from "axios";
import { useQuery } from "react-query";

export const getCoinChart = (coinId: string) => {
  return axios
    .get(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`)
    .then((res) => res.data);
};

export const useCoinChart = (coinId: string) => {
  const { data, isError, isLoading, ...rest } = useQuery({
    queryKey: ["CoinChart", coinId],
    queryFn: () => getCoinChart(coinId),
    suspense: false,
  });

  return { data, isError, isLoading, ...rest };
};
