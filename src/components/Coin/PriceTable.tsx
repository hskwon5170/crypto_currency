import React, { useState } from "react";

export const PriceTable = (data: any) => {
  //   const [objKey, setObjKey] = useState(Object.keys(data.data));
  console.log("data", Object.entries(data.data));

  const keyMapping = {
    price: "가격",
    volume_24h: "24시간 거래량",
  };

  return (
    <>
      {Object.entries(data.data).map(([key, value]) => (
        <div key={key}>
          <strong>{key}: </strong> {String(value)}
        </div>
      ))}
    </>
  );
};

const PriceElement = () => {
  return <div>dd</div>;
};
