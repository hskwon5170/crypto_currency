import React, { useEffect } from "react";
import { InputArea } from "./InputArea";
import { AiOutlineArrowDown } from "react-icons/ai";
import { CoinDetailResponse } from "../types";
import "./CoinCalculator.css";
import { useAtom, useAtomValue } from "jotai";
import { updateDarkAtom } from "../../commons/JotaiStore/darkmode";
import {
  calculatedValueAtom,
  inputValueAtom,
  selectCurrencyAtom,
  usdCurrencyAtom,
} from "../../commons/JotaiStore/calculator";

interface DataProps {
  data: CoinDetailResponse;
}

export const CoinCalculator = ({ data }: DataProps) => {
  const [dark] = useAtom(updateDarkAtom);
  const usdCurrency = useAtomValue(usdCurrencyAtom);
  const [calculated, setCalculated] = useAtom(calculatedValueAtom);
  const inputVal = useAtomValue(inputValueAtom);
  const currency = useAtomValue(selectCurrencyAtom);

  useEffect(() => {
    setCalculated(inputVal * usdCurrency);
  }, [inputVal, usdCurrency, setCalculated]);

  return (
    <div
      className={`${
        dark
          ? "bg-black border-[#1a1212] shadow-gray-600 shadow-2xl"
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
            globalCurrency
            calculatedUSD={calculated}
          />
        </div>
      </div>
    </div>
  );
};
