import React from "react";
import { CoinDetail } from "../types";

interface Original {
  original: CoinDetail;
}

interface CanvasChartProps {
  row: Original;
}

export const CanvasChart = ({ row }: CanvasChartProps) => {
  const { price } = row.original.sparkline_in_7d;
  const { price_change_percentage_24h: changePercentage } = row.original;
  const colorClass = changePercentage > 0 ? "#13bf35" : "#f23d3d";

  const drawSparkline = (canvas: HTMLCanvasElement) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const max = Math.max(...price);
    const min = Math.min(...price);

    const normalizedData = price.map((p: number) => {
      return ((p - min) / (max - min)) * height;
    });

    ctx.beginPath();
    ctx.moveTo(0, height - normalizedData[0]);

    normalizedData.forEach((point: number, index: number) => {
      ctx.lineTo((index / (normalizedData.length - 1)) * width, height - point);
    });

    ctx.strokeStyle = colorClass;
    ctx.stroke();
  };

  return <canvas ref={drawSparkline} width="100" height="30" />;
};
