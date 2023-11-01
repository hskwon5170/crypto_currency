import React from "react";
import { CoinDetailResponse } from "../types";
import { Title } from "../../commons/Title/Title";
import { SideButton } from "../../commons/SideButton/SideButton";

interface CoinNavBarProps {
  data?: CoinDetailResponse;
}

export const CoinNavBar = ({ data }: CoinNavBarProps) => {
  return (
    <section className="flex items-center  gap-3 p-2">
      <img src={data?.image.large} alt="coinLogo" className="coin-logo w-10" />

      <Title title={data?.name as string} />
      <span className="text-[#737373]">{data?.symbol}</span>

      <SideButton title={String("# " + data?.coingecko_rank)} />

      <div className="flex items-center gap-3 pl-6  bottom-[3px]">
        {/* <div className="font-semibold text-2xl">
              {`$` + Number(data?.market_data.current_price.usd).toFixed(3)}
            </div> */}
        <Title title={`$` + data?.market_data.current_price.usd.toFixed(3)} />

        <SideButton title="Live" />
      </div>
    </section>
  );
};
