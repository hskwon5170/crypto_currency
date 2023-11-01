import { useEffect, useState } from "react";

export interface QuoteProps {
  num: number;
}

export const useQuoteChanges = ({ num }: QuoteProps) => {
  const [quoteClass, setQuoteClass] = useState<string>("");
  useEffect(() => {
    if (num > 0) {
      setQuoteClass("text-[#40b66b]");
    } else {
      setQuoteClass("text-[#f23d3d]");
    }
  }, [setQuoteClass, num]);

  return { quoteClass };
};
