import React, { FC } from "react";

interface ButtonProps {
  imageUrl?: string;
  symbol?: string;
  globalCurrency?: boolean;
  onChangeCurrency?(cur: string): void;
}

export const CalculatorButton: FC<ButtonProps> = ({
  imageUrl,
  symbol,
  globalCurrency,
  onChangeCurrency,
}) => {
  return (
    <div className="flex items-center justify-center bg-black rounded-full overflow-hidden w-auto h-[2.5vw] px-3">
      {globalCurrency ? (
        <select
          className="bg-transparent outline-none"
          onChange={(e) => onChangeCurrency?.(e.target.value)}
          defaultValue="USD"
        >
          <option className="bg-transparent outline-none">usd</option>
          <option className="bg-transparent outline-none">krw</option>
        </select>
      ) : (
        <>
          <img
            src={imageUrl}
            alt="imageLogo"
            className=" w-auto h-[2vw] mx-2"
          />
          <div className="text-white text-[1.5vw] leading-[2vw] font-bold pr-3">
            {symbol?.toUpperCase()}
          </div>
        </>
      )}
    </div>
  );
};
