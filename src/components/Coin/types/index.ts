interface USD_Dto {
  ath_date: string;
  ath_price: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_1h: number;
  percent_change_1y: number;
  percent_change_6h: number;
  percent_change_7d: number;
  percent_change_12h: number;
  percent_change_15m: number;
  percent_change_24h: number;
  percent_change_30d: number;
  percent_change_30m: number;
  percent_from_price_ath: number;
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
}

export interface Quotes_Dto {
  USD: USD_Dto;
}

export interface CoinResponseDto {
  beta_value: number;
  circulating_supply: number;
  first_data_at: string;
  id: string;
  last_updated: string;
  max_supply: number;
  name: string;
  quotes: Quotes_Dto;
  rank: number;
  symbol: string;
  total_supply: number;
}

// 차트
interface ChartData {
  close: string;
  high: string;
  low: string;
  market_cap: number;
  open: string;
  time_close: number;
  time_open: number;
  volume: string;
}

export interface ChartProps {
  id?: string;
  data: ChartData[];
}

export interface CoinDetailResponse {
  id: string;
  symbol: string;
  name: string;
  asset_platform_id: string | null;
  platforms: Record<string, string>;
  additional_notices: string[];
  block_time_in_minutes: number;
  categories: string[];
  coingecko_rank: number;
  coingecko_score: number;
  community_data: {
    facebook_likes: number | null;
    twitter_followers: number;
    reddit_average_posts_48h: number;
    reddit_average_comments_48h: number;
    reddit_subscribers: number;
  };
  community_score: number;
  country_origin: string;
  description: Record<string, string>;
  detail_platforms: Record<string, any>;
  developer_data: {
    forks: number;
    stars: number;
    subscribers: number;
    total_issues: number;
    closed_issues: number;
  };
  developer_score: number;
  genesis_date: string;
  hashing_algorithm: string;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  last_updated: string;
  links: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
  };
  liquidity_score: number;
  localization: Record<string, string>;
  market_cap_rank: number;
  market_data: any;
  preview_listing: boolean;
  public_interest_score: number;
  public_interest_stats: {
    alexa_rank: number;
    bing_matches: number | null;
  };
  public_notice: string | null;
  sentiment_votes_down_percentage: number;
  sentiment_votes_up_percentage: number;
  status_updates: any[];
  tickers: Array<{
    base: string;
    bid_ask_spread_percentage: number;
    coin_id: string;
    converted_last: Record<string, number>;
    converted_volume: Record<string, number>;
    is_anomaly: boolean;
    is_stale: boolean;
    last: number;
    last_fetch_at: string;
    last_traded_at: string;
    market: {
      name: string;
      identifier: string;
      has_trading_incentive: boolean;
    };
    target: string;
    timestamp: string;
    token_info_url: string | null;
    trade_url: string;
    trust_score: string;
    volume: number;
  }>;
  watchlist_portfolio_users: number;
}
