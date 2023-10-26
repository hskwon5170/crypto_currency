import React from "react";

interface PropsValues {
  key: string;
  value: number;
}

export const PriceTable = (data: any) => {
  return (
    <div className="bg-white rounded-md px-16 p-3">
      {keyOrder.map((key) => {
        const value = data.data[key];
        // console.log("key", key);
        return (
          <div key={key} className="flex justify-between my-6 border-b-2 py-4">
            <div className="flex items-center space-x-1">
              <div className="font-bold">{keyMapping[key] || key}</div>
              {key === "ath_price" && (
                <div className="text-xs">
                  ({" "}
                  {new Date(data.data["ath_date"]).toISOString().split("T")[0]})
                </div>
              )}
            </div>
            <span
              className={`${applyColor({
                key,
                value,
              })} flex justify-center items-center  min-w-[100px] font-semibold`}
            >
              {formatValue({ key, value })}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const formatValue = ({ key, value }: PropsValues) => {
  if (key === "ath_price") {
    return `$ ` + value.toFixed(3);
  }
  return value > 0 ? "▲ " + value : "▼ " + value;
};

const applyColor = ({ key, value }: PropsValues) => {
  if (key === "ath_price") {
    return "";
  }
  return value > 0 ? "text-[#13bf36]" : "text-[#f23d3d]";
};

const keyOrder: Array<string> = [
  "ath_price",
  "percent_from_price_ath",
  "percent_change_15m",
  "percent_change_30m",
  "percent_change_1h",
  "percent_change_6h",
  "percent_change_12h",
  "percent_change_24h",
  "percent_change_7d",
  "percent_change_30d",
  "percent_change_1y",
];

const keyMapping: { [key: string]: string } = {
  ath_price: "All Time High",
  percent_from_price_ath: "From ATH",
  percent_change_15m: "15 Minutes",
  percent_change_30m: "30 Minutes",
  percent_change_1h: "1 Hour",
  percent_change_6h: "6 Hour",
  percent_change_12h: "12 Hour",
  percent_change_24h: "25 Hour",
  percent_change_7d: "7 Days",
  percent_change_30d: "30 Days",
  percent_change_1y: "1 Year",
};
