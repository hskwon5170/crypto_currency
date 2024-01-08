import { ApexOptions } from "apexcharts";
import ApexCharts from "react-apexcharts";
import React, { FC } from "react";
import { useCandleStickChart } from "./api/useCandleStickChart";

interface CandleStickChartProps {
  coinId: string;
}

export const CandleStickChart: FC<CandleStickChartProps> = ({ coinId }) => {
  const { data } = useCandleStickChart(coinId);

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
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 500,
        animateGradually: {
          enabled: true,
          delay: 500,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 500,
        },
      },
      type: "candlestick",
      height: 350,
      toolbar: {
        show: false,
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
      <ApexCharts
        options={options}
        series={series}
        type="candlestick"
        height={300}
      />
    </div>
  );
};
