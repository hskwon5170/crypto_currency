import React, { FC } from "react";
import { Select } from "antd";

interface ButtonProps {
  imageUrl?: string;
  symbol?: string;
  globalCurrency?: boolean;
  onChangeCurrency?(cur: string): void;
}

const currencies = [
  {
    label: "usd",
  },
  {
    label: "krw",
  },
];

export const CalculatorButton: FC<ButtonProps> = ({
  imageUrl,
  symbol,
  globalCurrency,
  onChangeCurrency,
}) => {
  return (
    <div className="flex items-center justify-center bg-black rounded-full overflow-hidden w-auto h-[2.5vw] px-3 sm:h-[10vw]">
      {globalCurrency ? (
        <select
          className="bg-transparent outline-none sm:text-[5vw]"
          onChange={(e) => onChangeCurrency?.(e.target.value)}
          defaultValue="USD"
        >
          <option className="bg-transparent outline-none">usd</option>
          <option className="bg-transparent outline-none">krw</option>
        </select>
      ) : (
        // <Select
        //   onChange={(e) => onChangeCurrency?.(e)}
        //   defaultValue="USD"
        //   options={currencies.map((currency) => ({
        //     label: currency.label.toUpperCase(),
        //     value: currency.label,
        //   }))}
        // />
        <>
          <img
            src={imageUrl}
            alt="imageLogo"
            className=" w-auto h-[2vw] mx-2 rounded-full sm:h-[8vw]"
          />
          <div className="text-white text-[1.5vw] leading-[2vw] font-bold pr-3 sm:text-[5vw]">
            {symbol?.toUpperCase()}
          </div>
        </>
      )}
    </div>
  );
};
