import React from "react";
import { CoinDetail } from "../../Coins/types";

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
    <div className="flex items-center pb-10">
      <strong className="mr-6">Price chart</strong>
      <div>24h</div>
      <div className={`${quoteClass} font-semibold py-3 ml-3`}>
        {Number(val.market_cap_change_percentage_24h.toFixed(2)) > 0
          ? "▲ "
          : "▼ "}
        {val.market_cap_change_percentage_24h.toFixed(2) + `%`}
      </div>
      <div className="flex ml-3 gap-3">
        {priceItems.map((key) => {
          return (
            <div key={key}>
              <span>{key}</span> :
              <span className="font-black">
                {" "}
                $ {priceValues[key]?.toFixed(3)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
