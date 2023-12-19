import React from "react";
import { InputArea } from "./InputArea";
import { AiOutlineArrowDown } from "react-icons/ai";
import { CoinDetailResponse } from "../types";
import "./CoinCalculator.css";
import { useAtom } from "jotai";
import { updateDarkAtom } from "../../commons/JotaiStore/JotaiStore";

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
  const [dark] = useAtom(updateDarkAtom);
  return (
    <div
      className={`${
        dark
          ? "bg-black border-[#2C2C2C] shadow-gray-600 shadow-2xl"
          : "bg-white border-[#f2f2f2] shadow-2xl"
      } border-[2px]   rounded-3xl max-w-[30rem] max-h-[30rem] p-2 gap-10 relative sm:w-[95%] wrap`}
    >
      <div className={`${dark ? "bg-black" : "bg-white"} h-full rounded-3xl`}>
        <div className="font-semibold pl-3 py-3">Swap</div>
        <div className="flex flex-col items-center space-y-6 relative">
          <InputArea
            subTitle="You pay"
            isImage
            imgUrl={data.image.large}
            symbol={data.symbol}
            onChangeToken={onChangeToken}
          />
          <div
            className={`absolute top-[calc(50%-20px)] transform -translate-y-1/2 ${
              dark ? "bg-black text-white " : "bg-white text-black"
            } p-3 rounded-xl`}
          >
            <div className={` ${dark ? "bg-[#2C2C2C]" : "bg-[#f9f9f9]"} p-2`}>
              <AiOutlineArrowDown />
            </div>
          </div>
          <InputArea
            subTitle={`You receive (${currency?.toUpperCase()})`}
            calculatedUSD={calculatedUSD}
            globalCurrency
            onChangeCurrency={onChangeCurrency}
            currency={currency}
          />
        </div>
      </div>
    </div>
  );
};
