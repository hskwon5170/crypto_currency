import axios from "axios";
import { useQuery } from "react-query";

interface CandleDataResponse {
  data: Array<[number, number, number, number, number]>;
}

export const getCandleStickChart = (
  coinId: string
): Promise<CandleDataResponse> => {
  return axios.get(
    `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=7`
  );
};

export const useCandleStickChart = (coinId: string) => {
  const { data, isLoading, ...rest } = useQuery({
    queryKey: ["candle", coinId],
    queryFn: () => getCandleStickChart(coinId),
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 10000 * 60 * 5,
  });

  return { data: data?.data, isLoading, ...rest };
};
