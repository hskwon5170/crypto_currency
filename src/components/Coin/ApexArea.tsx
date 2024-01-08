import React from "react";
import { ApexOptions } from "apexcharts";
import ApexCharts from "react-apexcharts";
import moment from "moment";
import "./ApexArea.css";

interface ChartDataProps {
  chartData: Array<[number, number]>;
}

export const ApexArea = ({ chartData }: ChartDataProps) => {
  //   const minY = Math.min(...chartData.map((item) => item[1]));
  //   const maxY = Math.max(...chartData.map((item) => item[1]));

  const series = [
    {
      name: "",
      data: chartData,
    },
  ];

  const options: ApexOptions = {
    chart: {
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
      type: "area",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      lineCap: "round",
      width: 2,
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
      //   min: minY,
      //   max: maxY,
      show: true,
      labels: {
        formatter: (value) => {
          return value.toFixed(0);
        },
      },
    },
    tooltip: {
      x: {
        // format: "MMM dd HH:mm A",
        formatter: function (val) {
          return moment(val).format("MMM DD HH:mm A");
        },
      },
      y: {
        formatter: function (val) {
          return "$" + val.toFixed(2);
        },
      },
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const x = w.globals.labels[dataPointIndex];
        const formattedX = moment(x).format("MMM D h:mm A");
        const y = series[seriesIndex][dataPointIndex];
        return (
          `<div class="custom-tooltip bg-black text-white p-4 rounded-md shadow-lg border-none">` +
          `<table>` +
          `<tbody>` +
          `<tr><td class="text-sm pr-2">Time:</td><td class="text-sm font-bold">${formattedX}</td></tr>` +
          `<tr><td class="text-sm pr-2">Price:</td><td class="text-sm font-bold">$${y.toFixed(
            0
          )}</td></tr>` +
          `</tbody>` +
          `</table>` +
          `</div>`
        );
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0,
        gradientToColors: ["#00c9ad"],
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100],
      },
    },
    legend: {
      horizontalAlign: "left",
    },
    grid: {
      show: false,
    },
    colors: ["#00c9ad"],
  };

  return (
    <div>
      <ApexCharts options={options} series={series} type="area" height={300} />
    </div>
  );
};
