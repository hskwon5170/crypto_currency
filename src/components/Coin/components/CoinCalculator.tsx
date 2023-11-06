import React from "react";
import { InputArea } from "./InputArea";
import { AiOutlineArrowDown } from "react-icons/ai";
import { CoinDetailResponse } from "../types";

interface DataProps {
  data: CoinDetailResponse;
  onChangeToken?(val: number): void;
  calculatedUSD?: number;
  onChangeCurrency?(cur: string): void;
  currency?: string;
}

export const CoinCalculator = ({
  data,
  onChangeToken,
  calculatedUSD,
  onChangeCurrency,
  currency,
}: DataProps) => {
  //   console.log("data", data);
  return (
    <div className="bg-black border-[1px] border-[#2C2C2C] rounded-3xl max-w-[30rem] max-h-[30rem] p-2 gap-10 relative sm:w-[95%]">
      <div className="font-semibold pl-3 py-3">Swap</div>
      <div className="flex flex-col items-center space-y-6 relative">
        <InputArea
          subTitle="You pay"
          isImage
          imgUrl={data.image.large}
          symbol={data.symbol}
          onChangeToken={onChangeToken}
        />
        <div className="absolute top-[calc(50%-20px)] transform -translate-y-1/2 text-white bg-black p-3 rounded-xl">
          <div className="bg-[#2C2C2C] p-2">
            <AiOutlineArrowDown />
          </div>
        </div>
        <InputArea
          subTitle={`You receive (${currency?.toUpperCase()})`}
          calculatedUSD={calculatedUSD}
          globalCurrency
          onChangeCurrency={onChangeCurrency}
        />
      </div>
    </div>
  );
};
