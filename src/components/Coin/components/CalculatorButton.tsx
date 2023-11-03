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
    <div className="flex items-center bg-black rounded-full py-2 px-4 overflow-x-hidden">
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
          <img src={imageUrl} alt="imageLogo" className="w-10 mr-2" />
          <div className="text-white text-2xl font-bold pr-3">
            {symbol?.toUpperCase()}
          </div>
        </>
      )}
    </div>
  );
};
