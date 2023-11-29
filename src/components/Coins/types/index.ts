export interface CoinData {
  id: string;
  is_active: boolean;
  is_new: boolean;
  name: string;
  rank: number;
  symbol: string;
  type: CoinData;
}

interface Object24 {
  usd: number;
}

export interface CoinDetail {
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  circulating_supply: number;
  current_price: number;
  fully_diluted_valuation: number;
  high_24h: Object24;
  id: string;
  image: string;
  last_updated: string;
  low_24h: Object24;
  market_cap: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  market_cap_rank: number;
  max_supply: number;
  name: string;
  price_change_24h: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: {
    price: number[];
  };
  roi: null | {
    times: number;
    currency: string;
    percentage: number;
  };
  symbol: string;
  total_supply: number;
  total_volume: number;
}

export type Column<T extends object> = {
  accessor: keyof T;
  // Header: string | React.ReactElement;
  Header: () => JSX.Element;
  Cell?: (cellProps: { value: any }) => React.ReactNode;
  width?: number;
};
