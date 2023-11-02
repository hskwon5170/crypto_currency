import React from "react";
import { InputArea } from "./InputArea";
import { AiOutlineArrowDown } from "react-icons/ai";
import { CoinDetailResponse } from "../types";

interface DataProps {
  data: CoinDetailResponse;
  onChangeToken?(val: number): void;
  calculatedUSD?: number;
}

export const CoinCalculator = ({
  data,
  onChangeToken,
  calculatedUSD,
}: DataProps) => {
  //   console.log("data", data);
  return (
    <div className="bg-black border-[1px] border-[#737373] rounded-3xl max-w-[30rem] max-h-[30rem] p-5 gap-10 relative">
      <div className="font-semibold pl-3">Swap</div>
      <div className="flex flex-col items-center space-y-6 relative">
        <InputArea
          subTitle="You pay"
          isImage
          imgUrl={data.image.large}
          symbol={data.symbol}
          onChangeToken={onChangeToken}
        />
        <div className="absolute top-[calc(50%-20px)] transform -translate-y-1/2 text-white bg-black p-3 rounded-xl">
          <div className="bg-gray-800 p-2">
            <AiOutlineArrowDown />
          </div>
        </div>
        <InputArea subTitle="You receive (USD)" calculatedUSD={calculatedUSD} />
      </div>
    </div>
  );
};
