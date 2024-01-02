import React, { FC } from "react";

interface CandleStickChartProps {
  chartData: [number, number][];
}

export const CandleStickChart: FC<CandleStickChartProps> = ({ chartData }) => {
  return (
    <div className="min-h-[400px]">
      <div>캔들스틱차드</div>
    </div>
  );
};
