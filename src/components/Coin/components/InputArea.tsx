import React, { FC, useState } from "react";
import { CalculatorButton } from "./CalculatorButton";
import { formatCompactNumber } from "../../../utils/formatCompactNumber";
// import { FaCircleQuestion } from "react-icons/fa6";

interface InputAreaProps {
  subTitle: string;
  isImage?: boolean;
  imgUrl?: string;
  symbol?: string;
  onChangeToken?(val: number): void;
  calculatedUSD?: number;
  globalCurrency?: boolean;
  onChangeCurrency?(cur: string): void;
  currency?: string;
}

export const InputArea: FC<InputAreaProps> = ({
  subTitle,
  isImage = false,
  imgUrl = "",
  symbol = "",
  onChangeToken,
  calculatedUSD,
  globalCurrency,
  onChangeCurrency,
  currency,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div
      className={`bg-[#1b1b1b] mt-3 rounded-3xl p-5 w-full  ${
        isFocused ? "border-[1px] border-[#737373]" : ""
      }`}
    >
      <div className="flex flex-col">
        <div className="text-[#737373]">{subTitle} </div>
        <div className="flex items-center">
          <input
            // type="number"
            className="bg-transparent outline-none text-5xl w-3/4 mr-3"
            placeholder="0"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => onChangeToken?.(Number(e.target.value))}
            value={formatCompactNumber(
              parseInt(calculatedUSD?.toFixed(0) || "")
            )}
          />
          {/* {isTokenTooltip && !isImage && (
            <Tooltip label={calculatedUSD?.toFixed(0) ?? 1}>
              <FaCircleQuestion />
            </Tooltip>
          )} */}

          {isImage && <CalculatorButton imageUrl={imgUrl} symbol={symbol} />}

          {globalCurrency && (
            <CalculatorButton
              globalCurrency={globalCurrency}
              onChangeCurrency={onChangeCurrency}
            />
          )}
        </div>
      </div>
    </div>
  );
};
