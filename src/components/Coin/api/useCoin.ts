import axios from "axios";
import { useQuery } from "react-query";
import { CoinDetailResponse } from "../types";

export const getCoin = (uuid: string): Promise<CoinDetailResponse> => {
  return (
    axios
      // .get(`https://api.coinranking.com/v2/coin/${uuid}`)?
      .get(`https://api.coingecko.com/api/v3/coins/${uuid}`)
      .then((res) => res.data)
  );
};

export const useCoin = (uuid: string) => {
  const { data, isLoading, ...rest } = useQuery({
    queryKey: ["coin", uuid],
    queryFn: () => getCoin(uuid),
    staleTime: 10000 * 60 * 5,
    suspense: true,
    onError: (error: any) => {
      throw error;
    },
  });

  return { data, isLoading, ...rest };
};
