import React from "react";

interface PriceElementProps {
  price: number;
  billion?: boolean;
  quote?: boolean;
}

export const PriceElement = ({
  price,
  billion = false,
  quote = false,
}: PriceElementProps) => {
  // console.log("price", typeof parseInt(price.toLocaleString()));
  if (billion) {
    return <div className="font-bold"> {returnValueAsBillion(price)}</div>;
  }

  return <div className="font-bold">{"$" + price.toLocaleString()}</div>;
};

const returnValueAsBillion = (value: number) => {
  const billion = 1000000000;
  return "$" + (value / billion).toFixed(2) + "B";
};
