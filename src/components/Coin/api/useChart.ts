import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";

const CHART_STORAGE_PREFIX = 'CACHED_CHART_';
const CHART_TIMESTAMP_PREFIX = 'CACHED_CHART_TIMESTAMP_';
const CACHE_DURATION = 5 * 60 * 1000; // 5분

const fetchChartFromAPI = async (coinId: string) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`
  );
  
  // 코인별로 차트 데이터 저장
  localStorage.setItem(
    `${CHART_STORAGE_PREFIX}${coinId}`, 
    JSON.stringify(response.data)
  );
  localStorage.setItem(
    `${CHART_TIMESTAMP_PREFIX}${coinId}`, 
    String(new Date().getTime())
  );
  
  return response.data;
};

const getChartData = async (coinId: string) => {
  const cachedData = localStorage.getItem(`${CHART_STORAGE_PREFIX}${coinId}`);
  const cachedTimestamp = localStorage.getItem(`${CHART_TIMESTAMP_PREFIX}${coinId}`);

  // 캐시된 데이터가 있고 유효기간 내라면 사용
  if (cachedData && cachedTimestamp) {
    const now = new Date().getTime();
    if (now - Number(cachedTimestamp) < CACHE_DURATION) {
      return JSON.parse(cachedData);
    }
  }

  // 캐시가 없거나 만료되었다면 API 호출
  return fetchChartFromAPI(coinId);
};

// 오래된 캐시 정리 함수
const cleanupOldCache = () => {
  const now = new Date().getTime();
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(CHART_TIMESTAMP_PREFIX)) {
      const timestamp = Number(localStorage.getItem(key));
      if (now - timestamp > CACHE_DURATION) {
        const coinId = key.replace(CHART_TIMESTAMP_PREFIX, '');
        localStorage.removeItem(`${CHART_STORAGE_PREFIX}${coinId}`);
        localStorage.removeItem(key);
      }
    }
  }
};

export const useChart = (coinId: string) => {
  const { data, isLoading, ...rest } = useQuery({
    queryKey: ["chart", coinId],
    queryFn: () => getChartData(coinId),
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // 컴포넌트 마운트 시 오래된 캐시 정리
  useEffect(() => {
    cleanupOldCache();
  }, []);

  return { data, isLoading, ...rest };
};