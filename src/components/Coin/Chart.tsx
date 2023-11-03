import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartProps {
  chartData: [number, number][];
}

const TICK_INTERVAL = 10;

const TimeStampToLabel = (time: number) => {
  const labelTime = new Date(time);
  const month = labelTime.getMonth() + 1;
  const date = labelTime.getDate();
  const hours = labelTime.getHours();
  const minutes = labelTime.getMinutes();
  return `${month}-${date} ${hours}:${minutes}0`;
};

export const Chart = ({ chartData }: ChartProps) => {
  // console.log("chartData", chartData);
  const formattedArray = chartData?.map((el: number[], i: number) => ({
    name: "q" + i,
    x: TimeStampToLabel(el[0]),
    y: el[1],
  }));

  const ticks = formattedArray
    ?.filter((_: any, index: number) => index % TICK_INTERVAL === 0)
    .map((item: any) => item.x);

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
    <ResponsiveContainer width="95%" height={400}>
      <AreaChart data={formattedArray}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#fb118e" stopOpacity={100} />
            <stop offset="95%" stopColor="white" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="x" ticks={ticks} />
        <YAxis
          dataKey="y"
          tickFormatter={(value) => value.toLocaleString()}
          domain={[0, maxY]}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="y"
          fill="url(#colorUv)"
          stroke="#fb118e"
          strokeWidth={3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  // console.log("active", active);
  // console.log("payload", payload);
  // console.log("label", label);
  return (
    <div className="custom-tooltip bg-[#311c31]  text-[#fc72ff]  p-4 rounded-md shadow-lg">
      <table>
        <tbody>
          <tr>
            <td className="text-sm pr-2">Time:</td>
            <td className="text-sm font-bold">{label}</td>
          </tr>
          <tr>
            <td className="text-sm pr-2">Price:</td>
            <td className="text-sm font-bold">
              ${payload[0]?.payload.y.toFixed(3)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
