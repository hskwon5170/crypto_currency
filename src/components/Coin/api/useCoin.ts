import axios from "axios";
import { useQuery } from "react-query";
import { CoinDetailResponse } from "../types";

interface AllTimeHigh {
  price: string;
  timestamp: number;
}

interface Link {
  name: string;
  type:
    | "website"
    | "bitcointalk"
    | "explorer"
    | "github"
    | "reddit"
    | "telegram"
    | "whitepaper";
  url: string;
}

interface Supply {
  confirmed: boolean;
  supplyAt: number;
  max: string;
  total: string;
  circulating: string;
}

interface CoinDetail {
  "24hVolume": string;
  allTimeHigh: AllTimeHigh;
  btcPrice: string;
  change: string;
  coinrankingUrl: string;
  color: string;
  description: string;
  fullyDilutedMarketCap: string;
  hasContent: boolean;
  iconUrl: string;
  links: Link[];
  listedAt: number;
  lowVolume: boolean;
  marketCap: string;
  name: string;
  notices: any;
  numberOfExchanges: number;
  numberOfMarkets: number;
  price: string;
  priceAt: number;
  rank: number;
  sparkline: string[];
  supply: Supply;
  symbol: string;
  tags: string[];
  tier: number;
  uuid: string;
  websiteUrl: string;
}

interface Coin {
  coin: CoinDetail;
}

interface CoinDetailResponseDto {
  data: Coin;
}

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
    suspense: true,
    onError: (error: any) => {
      throw error;
    },
  });

  return { data, isLoading, ...rest };
};
