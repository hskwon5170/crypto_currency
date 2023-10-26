import React from "react";
import axios from "axios";
import { NewsResponseDto } from "../type";
import { useQuery } from "react-query";

export const getNews = (coinId: string): Promise<NewsResponseDto[]> => {
  return axios
    .get(`https://api.coinpaprika.com/v1/coins/${coinId}/events`)
    .then((res) => res.data);
};

export const useNews = (coinId: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ["news", coinId],
    queryFn: () => getNews(coinId),
    suspense: true,
    retry: 1,
  });

  return { data, ...rest };
};
