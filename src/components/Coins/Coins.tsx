import React, { useMemo, useState } from "react";
import { Layout } from "../commons/layout/Layout";
import { useCoins } from "./api/useCoins";
import { ListItem } from "../commons/listItem/ListItem";
import Logo from "../../public/kripto.png";
import Table from "../commons/Table/Table";
import { CoinDetail } from "./types";
import { Chart } from "../Coin/Chart";
import { useNavigate } from "react-router-dom";
import CellChart from "./CellChart";

type Column<T extends object> = {
  accessor: keyof T;
  Header: string;
  Cell?: (cellProps: { value: any }) => React.ReactNode;
};

export const Coins = () => {
  const navigate = useNavigate();

  const { data } = useCoins();
  console.log("data", data);
  const RankerCoins = data?.slice(0, 8);
  const RestCoins = data?.slice(8);

  const [colorStatus, setColorStatus] = useState("");

  const returnValueAsBillion = (value: number) => {
    const billion = 1000000000;
    return (Number(value) / billion).toFixed(2) + " billion";
  };

  const handleCoinClick = (coinId: any) => {
    navigate(`/coins/${coinId}`);
  };

  // const quoteChanges =
  //   Number(data) > 0
  //     ? "text-[#13bf36]"
  //     : "text-[#f23d3d]";

  const quoteChanges = (num: number) => {
    if (num > 0) {
      return (
        <span className="text-white bg-[#13bf36] rounded-md p-1 font-bold">
          ▲ {Math.abs(Number(num)).toFixed(2)} %
        </span>
      );
    } else {
      // console.log(num);
      return (
        <span className="text-white bg-[#f23d3d] rounded-md p-1 font-bold">
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
        Header: "Coins",
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
        accessor: "price_change_24h",
        Header: "Price change",
        Cell: ({ row }: any) => (
          <div>
            <div className="font-bold pb-3">
              {+Number(row.original.price_change_24h).toFixed(2) + " $"}
            </div>
            <span className="quoteChangeClass">
              {quoteChanges(row.original.price_change_percentage_24h)}
            </span>
          </div>
        ),
      },
      {
        accessor: "current_price",
        Header: "Price",
        Cell: ({ value }) => (
          <div className="font-bold">$ {Number(value).toFixed(2)}</div>
        ),
      },
      {
        accessor: "market_cap",
        Header: "Market cap",
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
        Header: "7 Days",
        Cell: ({ row }: any) => {
          const { price } = row.original.sparkline_in_7d;
          // console.log("^*^", row.original.price_change_percentage_24h);
          const priceChange = row.original.price_change_percentage_24h;

          const color = priceChange > 0 ? "#13bf36" : "#f23d3d";
          // row.original.price_change_percentage_24h > 0
          //   ? setColorStatus("#13bf36")
          //   : setColorStatus("#f23d3d");
          // Canvas를 그릴 때 사용할 함수
          const drawSparkline = (canvas: HTMLCanvasElement) => {
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const width = canvas.width;
            const height = canvas.height;

            // 데이터를 캔버스 크기에 맞게 정규화
            const max = Math.max(...price);
            const min = Math.min(...price);
            const normalizedData = price.map(
              (p: any) => ((p - min) / (max - min)) * height
            );
            // console.log("normalizedData", normalizedData);

            ctx.beginPath();
            ctx.moveTo(0, height - normalizedData[0]); // 시작점

            normalizedData.forEach((point: any, index: any) => {
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
    [colorStatus]
  );

  return (
    <Layout isListPage title="List">
      <div>
        <div className="flex justify-start items-center py-6 gap-3">
          <img src={Logo} alt="logo" className="w-10" />
          <div className="font-black text-black text-3xl">CryptoCurrency</div>
        </div>
        <Table columns={columns} data={data} onRowClick={handleCoinClick} />
      </div>
    </Layout>
  );
};
