import React from "react";
import { VictoryArea, VictoryChart, VictoryVoronoiContainer } from "victory";

export const Chart = ({ chartData }: any) => {
  // console.log("잘넘어오나확인", data);
  return (
    <VictoryChart
      containerComponent={
        <VictoryVoronoiContainer
          mouseFollowTooltips
          voronoiDimension="x"
          labels={({ datum }) => {
            // console.log(datum);
            return `y:${datum._y.toFixed(4)}`;
          }}
        />
      }
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#99bfff" />
          <stop offset="100%" stopColor="white" />
        </linearGradient>
      </defs>
      <VictoryArea
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 },
        }}
        style={{
          data: {
            fill: "url(#gradient)",
            stroke: "#0061ff",
            strokeWidth: 0.8,
          },
        }}
        data={chartData}
      />
    </VictoryChart>
  );
};
