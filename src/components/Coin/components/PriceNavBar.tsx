import React from "react";
import { CoinDetail } from "../../Coins/types";
import { BottomLayout } from "../../commons/BottomLayout/BottomLayout";

interface NavBarProps {
  val: CoinDetail;
  priceItems: string[];
  quoteClass: string;
}

export const PriceNavBar = ({ val, priceItems, quoteClass }: NavBarProps) => {
  const priceValues: { [key: string]: any } = {
    High: val.high_24h.usd,
    Low: val.low_24h.usd,
    Average: (val.high_24h.usd + val.low_24h.usd) / 2,
  };

  return (
    <BottomLayout title="Stats">
      <div className="flex gap-6">
        <div className="flex flex-col items-start">
          <div className="text-[#737373]">24h</div>
          <div className="flex gap-3 text-3xl items-end pt-3">
            <div className="text-[1.5vw]">
              {val.market_cap_change_percentage_24h.toFixed(2) + `%`}
            </div>
            <div className={`${quoteClass} font-semibold text-[1vw]`}>
              {Number(val.market_cap_change_percentage_24h.toFixed(2)) > 0
                ? "▲ "
                : "▼ "}
            </div>
          </div>
        </div>
        {priceItems.map((key) => {
          return (
            <div key={key} className="flex flex-col items-start pr-6">
              <span className="text-[#737373]">{key}</span>
              <span className="font-medium text-[1.5vw] pt-3">
                $ {priceValues[key]?.toFixed(3)}
              </span>
            </div>
          );
        })}
      </div>
    </BottomLayout>
  );
};
