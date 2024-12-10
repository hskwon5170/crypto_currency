import axios from "axios";
import { useQuery } from "react-query";
import { CoinDetailResponse } from "../types";
import React from "react";

const COIN_DETAIL_PREFIX = 'CACHED_COIN_DETAIL_';
const COIN_DETAIL_TIMESTAMP_PREFIX = 'CACHED_COIN_DETAIL_TIMESTAMP_';
const CACHE_DURATION = 5 * 60 * 1000; // 5분

const fetchCoinFromAPI = async (uuid: string): Promise<CoinDetailResponse> => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${uuid}`
  );
  
  // 코인 상세 정보 저장
  localStorage.setItem(
    `${COIN_DETAIL_PREFIX}${uuid}`, 
    JSON.stringify(response.data)
  );
  localStorage.setItem(
    `${COIN_DETAIL_TIMESTAMP_PREFIX}${uuid}`, 
    String(new Date().getTime())
  );
  
  return response.data;
};

const getCoinData = async (uuid: string): Promise<CoinDetailResponse> => {
  const cachedData = localStorage.getItem(`${COIN_DETAIL_PREFIX}${uuid}`);
  const cachedTimestamp = localStorage.getItem(`${COIN_DETAIL_TIMESTAMP_PREFIX}${uuid}`);

  // 캐시된 데이터가 있고 유효기간 내라면 사용
  if (cachedData && cachedTimestamp) {
    const now = new Date().getTime();
    if (now - Number(cachedTimestamp) < CACHE_DURATION) {
      return JSON.parse(cachedData);
    }
  }

  // 캐시가 없거나 만료되었다면 API 호출
  return fetchCoinFromAPI(uuid);
};

// 오래된 캐시 정리
const cleanupOldCoinCache = () => {
  const now = new Date().getTime();
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(COIN_DETAIL_TIMESTAMP_PREFIX)) {
      const timestamp = Number(localStorage.getItem(key));
      if (now - timestamp > CACHE_DURATION) {
        const coinId = key.replace(COIN_DETAIL_TIMESTAMP_PREFIX, '');
        localStorage.removeItem(`${COIN_DETAIL_PREFIX}${coinId}`);
        localStorage.removeItem(key);
      }
    }
  }
};

export const useCoin = (uuid: string) => {
  const { data, isLoading, ...rest } = useQuery({
    queryKey: ["coin", uuid],
    queryFn: () => getCoinData(uuid),
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    suspense: true,
    onError: (error: any) => {
      throw error;
    },
  });

  // 컴포넌트 마운트 시 오래된 캐시 정리
  React.useEffect(() => {
    cleanupOldCoinCache();
  }, []);

  return { data, isLoading, ...rest };
};