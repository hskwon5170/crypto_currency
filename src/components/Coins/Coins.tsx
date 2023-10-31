import React, { useMemo } from "react";
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
  const { data } = useCoins();
  // console.log("data", data);
  const RankerCoins = data?.slice(0, 8);
  const RestCoins = data?.slice(8);

  const returnValueAsBillion = (value: number) => {
    const billion = 1000000000;
    return (Number(value) / billion).toFixed(2) + " billion";
  };

  const navigate = useNavigate();

  const handleCoinClick = (coinId: any) => {
    navigate(`/coins/${coinId}`);
  };

  // const quoteChanges =
  //   Number(data) > 0
  //     ? "text-[#13bf36]"
  //     : "text-[#f23d3d]";

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

            ctx.strokeStyle = "#0061ff";
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
    <Layout title="CryptoPulse">
      <div className="flex justify-start items-center py-6 gap-3">
        <img src={Logo} alt="logo" className="w-10" />
        <div className="font-black text-black text-3xl">CryptoPulse</div>
      </div>
      <Table columns={columns} data={data} onRowClick={handleCoinClick} />

      {/* <div className="grid grid-cols-2 justify-items-center align-items-center md:grid-cols-4 gap-6 my-6">
        {RankerCoins?.map((rcoin) => (
          <div key={rcoin.id}>
            <ListItem
              imageUrl={rcoin.image}
              title={rcoin.name}
              initial={rcoin.symbol}
              isRanker
              {...rcoin}
            />
          </div>
        ))}
      </div>

      {RestCoins?.map((coin) => (
        <div key={coin.id} className="py-3">
          <ListItem
            imageUrl={coin.image}
            title={coin.name}
            initial={coin.symbol}
            {...coin}
          />
        </div>
      ))} */}
    </Layout>
  );
};
