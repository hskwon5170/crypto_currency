import React from "react";
import { CoinDetailResponse } from "../types";

interface CoinNavBarProps {
  data?: CoinDetailResponse;
  quoteClass?: string;
}

export const CoinNavBar = ({ data, quoteClass }: CoinNavBarProps) => {
  return (
    <div className="flex flex-col items-start py-20 gap-3 sm:pl-1 sm:py-6">
      <div className="flex items-center gap-2 max-h-[70px]">
        <img
          src={data?.image.large}
          alt="coinLogo"
          className="coin-logo w-10"
        />
        <div className="text-2xl font-medium">{data?.name as string}</div>
        <div className="text-[#737373] text-2xl">
          {data?.symbol?.toUpperCase()}
        </div>
      </div>
      <div className="font-bold text-3xl">
        {`$` +
          Number(
            data?.market_data.current_price.usd.toFixed(3)
          ).toLocaleString()}
      </div>
      <div className="flex gap-2 text-xl items-end">
        <div className="text-[#737373]">
          {data?.market_data.market_cap_change_percentage_24h.toFixed(2) + `%`}
        </div>
        <div className={`${quoteClass} font-semibold text-[10px]`}>
          {Number(
            data?.market_data.market_cap_change_percentage_24h.toFixed(2)
          ) > 0
            ? "▲ "
            : "▼ "}
        </div>
      </div>
    </div>
  );
};
