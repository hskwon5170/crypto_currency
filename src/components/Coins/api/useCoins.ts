import axios from "axios";
import { useQuery } from "react-query";
import { CoinDetail } from "../types";

const COINS_STORAGE_KEY = 'CACHED_COINS_DATA';
const COINS_TIMESTAMP_KEY = 'CACHED_COINS_TIMESTAMP';
const CACHE_DURATION = 5 * 60 * 1000;

const fetchCoinsFromApi = async (): Promise<CoinDetail[]> => {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&limit=100&sparkline=true"
  );
  
  localStorage.setItem(COINS_STORAGE_KEY, JSON.stringify(response.data))
  localStorage.setItem(COINS_TIMESTAMP_KEY, String(new Date().getTime()))

  return response.data;
};

// export const getCoins = (): Promise<CoinDetail[]> => {
//   return axios
//     .get(
//       "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&limit=100&sparkline=true"
//     )
//     .then((res) => res.data);
// };

const getCoinsData = async (): Promise<CoinDetail[]> => {
  const cachedData = localStorage.getItem(COINS_STORAGE_KEY);
  const cachedTimestamp = localStorage.getItem(COINS_TIMESTAMP_KEY);

  if (cachedData && cachedTimestamp) {
    const now = new Date().getTime()
    if  (now - Number(cachedTimestamp) < CACHE_DURATION) {
      return JSON.parse(cachedData)
    }
  }

  return fetchCoinsFromApi()
}

export const useCoins = () => {
  const { data, isLoading, ...rest } = useQuery({
    queryKey: ["coins"],
    queryFn: getCoinsData,
    suspense: true,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, ...rest };
};
