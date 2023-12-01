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

    const width = canvas.width; // 100
    const height = canvas.height; // 30

    const max = Math.max(...price); // 각각의 코인의 spark line price 중 `최댓값`
    const min = Math.min(...price); // 각각의 코인의 spark line price 중 `최솟값`

    // 검색한 결과를 리스트에 렌더링할때 spark_line이 겹쳐보이는 이슈 수정
    ctx.clearRect(0, 0, width, height);

    const normalizedData = price.map((p: number) => {
      return ((p - min) / (max - min)) * height;
    });

    ctx.beginPath(); // stroke 그리기 시작
    ctx.moveTo(0, height - normalizedData[0]); // 최종 도달 지점

    normalizedData.forEach((point: number, index: number) => {
      ctx.lineTo((index / (normalizedData.length - 1)) * width, height - point); // 그리기
    });

    ctx.strokeStyle = colorClass; // stroke 스타일

    // stroke width
    ctx.lineWidth = 1.8;

    // stroke 끝부분
    ctx.lineCap = "round";

    // stroke 꺾이는(연결되는) 부분
    ctx.lineJoin = "round";
    ctx.stroke();
  };

  return <canvas ref={drawSparkline} width="100" height="30" />;
};
