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
    // 10초 - 10,000ms
    // 60초 - 10,000 * 60 (60,000ms)
    // 5분 - 10,000 * 60 * 5
    staleTime: 10000 * 60 * 5, // 5분만큼 데이터가 fresh, 그 이후에 stale상태
  });

  return { data, isLoading, ...rest };
};
