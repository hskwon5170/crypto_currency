import axios from "axios";
import { useQuery } from "react-query";

interface ChartProps {
  coinId?: string;
}
export const getChart = (coinId: string) => {
  return axios
    .get(`https://api.coingecko.com/api/v3/coins/${coinId}?sparkline=true`)
    .then((res) => res.data);
};

export const useChart = (coinId: string) => {
  const { data, isLoading, ...rest } = useQuery({
    queryKey: ["chart", coinId],
    queryFn: () => getChart(coinId),
    retry: 1,
  });

  return { data: data?.market_data.sparkline_7d.price, isLoading, ...rest };
};
