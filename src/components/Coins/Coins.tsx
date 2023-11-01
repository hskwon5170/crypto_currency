import React, { useMemo, useState } from "react";
import { Layout } from "../commons/layout/Layout";
import { useCoins } from "./api/useCoins";
import Logo from "../../public/kripto.png";
import Table from "../commons/Table/Table";
import { CoinDetail, Column } from "./types";
import { useNavigate } from "react-router-dom";

export const Coins = () => {
  const navigate = useNavigate();
  const { data } = useCoins();

  const returnValueAsBillion = (value: number) => {
    const billion = 1000000000;
    return (Number(value) / billion).toFixed(2) + "B";
  };

  const handleCoinClick = (coinId: any) => {
    navigate(`/coins/${coinId}`);
  };

  const quoteChanges = (num: number) => {
    if (num > 0) {
      return (
        <span className="text-[#40b66b]">
          ▲ {Math.abs(Number(num)).toFixed(2)} %
        </span>
      );
    } else {
      return (
        <span className="text-[#f23d3d]">
          ▼ {Math.abs(Number(num)).toFixed(2)} %
        </span>
      );
    }
  };

  const columns = useMemo<Column<CoinDetail>[]>(
    () => [
      {
        accessor: "market_cap_rank",
        Header: "",
        Cell: ({ value }) => {
          return <div>{value}</div>;
        },
      },

      {
        accessor: "id",
        Header: "Token name",
        Cell: ({ row }: any) => (
          <div className="flex gap-5 items-center justify-start ml-10 py-6">
            <img
              src={row.original.image}
              alt="Coin"
              style={{ width: "40px", height: "40px" }}
            />
            <div className="flex flex-col justify-center items-start">
              <span className="font-bold text-lg">{row.original.id}</span>
              <span>{row.original.symbol}</span>
            </div>
          </div>
        ),
      },
      {
        accessor: "current_price",
        Header: "Price",
        Cell: ({ value }) => (
          <div className="font-bold">${Number(value).toFixed(2)}</div>
        ),
      },
      {
        accessor: "price_change_24h",
        Header: "Change",
        Cell: ({ row }: any) => (
          <div>
            <div className="quoteChangeClass">
              {quoteChanges(row.original.price_change_percentage_24h)}
            </div>
          </div>
        ),
      },
      {
        accessor: "market_cap",
        Header: "Market cap",
        Cell: ({ value }) => (
          <div className="font-bold">${returnValueAsBillion(value)}</div>
        ),
      },
      {
        accessor: "total_volume",
        Header: "Volume",
        Cell: ({ value }) => (
          <div className="font-bold">${returnValueAsBillion(value)}</div>
        ),
      },
      // {
      //   accessor: "sparkline_in_7d",
      //   Header: "7 Days",
      //   Cell: ({ row }: any) => {
      //     // const { price } = value;
      //     const { price } = row.original.sparkline_in_7d;
      //     const { market_cap_change_percentage_24h } = row.original;
      //     return (
      //       <div>
      //         {/* <div className="relative left-[28px]">
      //           {Number(market_cap_change_percentage_24h).toFixed(2)}
      //         </div> */}
      //         <CellChart chartData={price} />
      //       </div>
      //     );
      //   },
      // },
      {
        accessor: "sparkline_in_7d",
        Header: "",
        Cell: ({ row }: any) => {
          const { price } = row.original.sparkline_in_7d;
          const priceChange = row.original.price_change_percentage_24h;

          const color = priceChange > 0 ? "#13bf36" : "#f23d3d";

          const drawSparkline = (canvas: HTMLCanvasElement) => {
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return; // context를 지원하지 않는 브라우저 대비 => context 없으면 return

            const width = canvas.width;
            const height = canvas.height;
            // console.log("height", height);

            // 데이터를 캔버스 크기에 맞게 정규화
            const max = Math.max(...price);
            const min = Math.min(...price);
            const normalizedData = price.map((p: number) => {
              return ((p - min) / (max - min)) * height;
            });
            // console.log("normalizedData", normalizedData);

            ctx.beginPath(); // Path 시작
            ctx.moveTo(0, height - normalizedData[0]); // 이동

            normalizedData.forEach((point: number, index: number) => {
              ctx.lineTo(
                (index / (normalizedData.length - 1)) * width,
                height - point
              );
            });

            ctx.strokeStyle = color;
            ctx.stroke();
          };

          return (
            <div>
              <canvas ref={drawSparkline} width="100" height="30" />
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <Layout isListPage title="List">
      <div className="flex justify-start items-center py-6 gap-3">
        <img src={Logo} alt="logo" className="w-10" />
        <div className="font-black text-3xl">CryptoCurrency</div>
      </div>
      <div className=" py-10 font-semibold text-2xl ">
        Top Tokens on CryptoCurrency
      </div>
      <Table columns={columns} data={data} onRowClick={handleCoinClick} />
    </Layout>
  );
};
