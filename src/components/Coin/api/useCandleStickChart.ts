import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const CANDLE_DATA_PREFIX = 'CACHED_CANDLE_';
const CANDLE_TIMESTAMP_PREFIX = 'CACHED_CANDLE_TIMESTAMP_';
const CACHE_DURATION = 5 * 60 * 1000; // 5분

interface CandleDataResponse {
  data: Array<[number, number, number, number, number]>;
}

const fetchCandleDataFromAPI = async (coinId: string): Promise<CandleDataResponse> => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=7`
  );
  
  // 캔들스틱 데이터 저장
  localStorage.setItem(
    `${CANDLE_DATA_PREFIX}${coinId}`, 
    JSON.stringify(response)
  );
  localStorage.setItem(
    `${CANDLE_TIMESTAMP_PREFIX}${coinId}`, 
    String(new Date().getTime())
  );
  
  return response;
};

const getCandleData = async (coinId: string): Promise<CandleDataResponse> => {
  const cachedData = localStorage.getItem(`${CANDLE_DATA_PREFIX}${coinId}`);
  const cachedTimestamp = localStorage.getItem(`${CANDLE_TIMESTAMP_PREFIX}${coinId}`);

  // 캐시된 데이터가 있고 유효기간 내라면 사용
  if (cachedData && cachedTimestamp) {
    const now = new Date().getTime();
    if (now - Number(cachedTimestamp) < CACHE_DURATION) {
      return JSON.parse(cachedData);
    }
  }

  // 캐시가 없거나 만료되었다면 API 호출
  return fetchCandleDataFromAPI(coinId);
};

// 오래된 캐시 정리
const cleanupOldCandleCache = () => {
  const now = new Date().getTime();
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(CANDLE_TIMESTAMP_PREFIX)) {
      const timestamp = Number(localStorage.getItem(key));
      if (now - timestamp > CACHE_DURATION) {
        const coinId = key.replace(CANDLE_TIMESTAMP_PREFIX, '');
        localStorage.removeItem(`${CANDLE_DATA_PREFIX}${coinId}`);
        localStorage.removeItem(key);
      }
    }
  }
};

export const useCandleStickChart = (coinId: string) => {
  const { data, isLoading, ...rest } = useQuery({
    queryKey: ["candle", coinId],
    queryFn: () => getCandleData(coinId),
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // 컴포넌트 마운트 시 오래된 캐시 정리
  React.useEffect(() => {
    cleanupOldCandleCache();
  }, []);

  return { data: data?.data, isLoading, ...rest };
};