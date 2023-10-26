import React from "react";
import { ChartProps } from "./types";
import ApexCharts from "react-apexcharts";

export const Chart = ({ data }: ChartProps) => {
  // console.log("잘넘어오나확인", data);
  return (
    <div>
      <ApexCharts
        type="candlestick"
        series={[
          {
            data: data?.map((item) => ({
              x: new Date(item.time_close * 1000),
              y: [item.open, item.high, item.low, item.close],
            })),
          },
        ]}
        options={{
          chart: {
            type: "candlestick",
            toolbar: {
              show: false,
            },
            background: "transparent",
          },
          title: {
            text: "CandleStick for 2 weeks",
            align: "center",
          },
          stroke: {
            curve: "smooth",
            width: 2,
          },
          yaxis: {
            show: true,
          },
          xaxis: {
            labels: {
              formatter: function (val: any) {
                const day = new Date(val);
                return `${day.getMonth() + 1} / ${day.getDate()}`;
              },
            },
          },
        }}
      />
    </div>
  );
};
