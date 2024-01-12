import React, { FC } from "react";
import { useAtom } from "jotai";
import { updateDarkAtom } from "../../commons/JotaiStore/darkmode";
import { updateCurrencyAtom } from "../../commons/JotaiStore/calculator";

interface ButtonProps {
  imageUrl?: string;
  symbol?: string;
  globalCurrency?: boolean;
  // onChangeCurrency?(cur: string): void;
}

// const currencies = [
//   {
//     label: "usd",
//   },
//   {
//     label: "krw",
//   },
// ];

export const CalculatorButton: FC<ButtonProps> = ({
  imageUrl,
  symbol,
  globalCurrency,
}) => {
  const [dark] = useAtom(updateDarkAtom);
  const [, setCurrency] = useAtom(updateCurrencyAtom);

  return (
    <div
      className={`flex items-center justify-center ${
        dark ? "bg-black" : "bg-white"
      } shadow-2xl rounded-full overflow-hidden w-auto h-[2.5vw] px-3 sm:h-[10vw]`}
    >
      {globalCurrency ? (
        <select
          className="bg-transparent outline-none sm:text-[5vw]"
          onChange={(e) => setCurrency(e.target.value)}
          defaultValue="USD"
        >
          <option
            className={`${
              dark ? "bg-black text-white" : "bg-white text-black"
            } outline-none`}
          >
            usd
          </option>
          <option
            className={`${
              dark ? "bg-black text-white" : "bg-white text-black"
            } outline-none`}
          >
            krw
          </option>
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
          <div
            className={`${
              dark ? "text-white" : "text-black"
            } text-[1.5vw] leading-[2vw] font-bold pr-3 sm:text-[5vw]`}
          >
            {symbol?.toUpperCase()}
          </div>
        </>
      )}
    </div>
  );
};
