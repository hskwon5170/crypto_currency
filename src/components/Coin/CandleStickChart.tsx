import { ApexOptions } from "apexcharts";
import ApexCharts from "react-apexcharts";
import React, { FC } from "react";
import { useCandleStickChart } from "./api/useCandleStickChart";
import { useSetAtom } from "jotai";
import { unableCandleAtom } from "../commons/JotaiStore/coin";

interface CandleStickChartProps {
  coinId: string;
}

export const CandleStickChart: FC<CandleStickChartProps> = ({ coinId }) => {
  const { data } = useCandleStickChart(coinId);
  console.log("data", data);
  const setUnableCandle = useSetAtom(unableCandleAtom);
  if (data?.length === 0) {
    setUnableCandle(true);
  }

  const formattedCandleData = data?.map(([date, open, high, low, close]) => {
    return {
      x: new Date(date),
      y: [open, high, low, close],
    };
  });

  const series = [
    {
      data: formattedCandleData || [],
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "candlestick",
      height: 350,
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: "easein",
        speed: 300,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 300,
        },
      },
    },

    xaxis: {
      type: "datetime",
      axisBorder: {
        color: "black",
      },
      tickAmount: 5,

      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      show: true,

      tooltip: {
        enabled: true,
      },
      labels: {
        formatter: (value) => {
          return value.toFixed(0);
        },
      },
    },
    grid: {
      show: false,
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#df383e",
          downward: "#3593f7",
        },
        wick: {
          useFillColor: true,
        },
      },
    },
    stroke: {
      show: true,
      colors: ["black"],
      width: 1,
    },
  };

  return (
    <div>
      <ApexCharts options={options} series={series} type="candlestick" height={300} />
    </div>
  );
};
