import React, { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";

interface ChartProps {
  chartData: number[];
}

const gradientDefs = (
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#99bfff" stopOpacity={100} />
      <stop offset="95%" stopColor="#99bfff" stopOpacity={0} />
    </linearGradient>
  </defs>
);

const CellChartComponent = ({ chartData }: ChartProps) => {
  // console.log("chartData", chartData);
  const formattedArray = useMemo(() => {
    return chartData?.map((el: number, i: number) => ({
      x: i,
      y: el,
    }));
  }, [chartData]);

  const maxY = useMemo(() => {
    const value = Math.max(...formattedArray.map((i) => i.y));
    if (value < 5) {
      return value + 0.5;
    }
    if (value < 1000) {
      return value + 100;
    }
    if (value > 1000) {
      return value + 1000;
    }
    if (value > 10000) {
      return value + 10000;
    }
    return value;
  }, [formattedArray]);

  return (
    <AreaChart width={100} height={100} data={formattedArray}>
      {gradientDefs}
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="x" hide={true} />
      <YAxis dataKey="y" hide={true} domain={[0, maxY]} />
      <Area
        type="monotone"
        dataKey="y"
        fill="url(#colorUv)"
        stroke="#0061ff"
        strokeWidth={1}
      />
    </AreaChart>
  );
};

export default React.memo(CellChartComponent);
