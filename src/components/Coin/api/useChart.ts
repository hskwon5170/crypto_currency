import axios from "axios";
import { useQuery } from "react-query";

export const getChart = (coinId: string) => {
  return axios
    .get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7
    `
    )
    .then((res) => res.data);
};

export const useChart = (coinId: string) => {
  const { data, isLoading, ...rest } = useQuery({
    queryKey: ["chart", coinId],
    queryFn: () => getChart(coinId),
    retry: 1,
  });

  return { data, isLoading, ...rest };
};
