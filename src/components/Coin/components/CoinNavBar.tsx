import React from "react";
import { CoinDetailResponse } from "../types";
import { Title } from "../../commons/Title/Title";
import { SideButton } from "../../commons/SideButton/SideButton";

interface CoinNavBarProps {
  data?: CoinDetailResponse;
}

export const CoinNavBar = ({ data }: CoinNavBarProps) => {
  return (
    <div className="flex flex-col items-start py-10 gap-3">
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
    </div>
  );
};
