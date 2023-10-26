import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCoin } from "./api/useCoin";
import { Layout } from "../commons/layout/Layout";
import { IoIosArrowBack } from "react-icons/io";
import { FaCircleInfo } from "react-icons/fa6";
import { PriceTable } from "./PriceTable";
import { useCoinChart } from "./api/useCoinChart";
import { Chart } from "./Chart";
import { Tooltip } from "antd";

export const Coin = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useCoin(id as string);
  const [tab, setTab] = useState("chart");

  const { data: chartData } = useCoinChart(id as string);
  // console.log("chartData", chartData);

  const quoteChanges =
    data?.quotes.USD.percent_change_24h! > 0
      ? "text-[#13bf36]"
      : "text-[#f23d3d]";

  const selectTabStyle = (currentTab: string) => {
    return tab === currentTab
      ? "font-bold text-primary border-b-4 border-primary"
      : "";
  };

  return (
    <Layout
      title={id as string}
      // imageUrl={`https://coinicons-api.vercel.app/api/icon/${data?.symbol.toLocaleLowerCase()}`}
    >
      <div className="flex items-center text-2xl gap-3">
        <IoIosArrowBack
          onClick={() => navigate(-1)}
          className="cursor-pointer hover:text-primary"
        />
        <span>{data?.symbol}</span>
      </div>

      <section className="py-10 flex gap-3">
        <img
          src={`https://coinicons-api.vercel.app/api/icon/${data?.symbol.toLocaleLowerCase()}`}
          alt="coinLogo"
          className="w-14"
        />
        <span className="text-primary font-extrabold text-5xl">
          {data?.name}
        </span>
      </section>

      <section>
        <div className="font-semibold text-5xl">
          {`$` + data?.quotes.USD.price.toFixed(3)}
        </div>
        <div className={`${quoteChanges} font-semibold text-3xl py-3`}>
          {data?.quotes.USD.percent_change_24h! > 0 ? "▲ " : "▼ "}
          {data?.quotes.USD.percent_change_24h + `%`}
        </div>
      </section>

      <section>
        <div className="text-primary text-2xl py-6" style={{ fontWeight: 600 }}>
          Rank # {data?.rank}
        </div>
        <div className="grid grid-cols-2 bg-white rounded-md min-h-[100px]">
          <section className="flex flex-col items-center p-6 border-r-2 border-gray-200">
            <div className="flex items-center gap-1 text-gray-400">
              <div>Market Cap</div>
              <Tooltip title="Current Price * Circulating Supply">
                <FaCircleInfo />
              </Tooltip>
            </div>
            <div className="font-semibold text-3xl">
              {(data?.quotes.USD.market_cap! / 1000000000).toFixed(2)}B
            </div>
          </section>

          <section className="flex flex-col items-center p-6 border-r-2 border-gray-200">
            <div className="flex items-center gap-1 text-gray-400">
              <div>24H Volume</div>
              <Tooltip title="Total value of crypto traded in the past 24 hours">
                <FaCircleInfo />
              </Tooltip>
            </div>
            <div className="font-semibold text-3xl">
              {(data?.quotes.USD.volume_24h! / 1000000000).toFixed(2)}B
            </div>
          </section>
        </div>
      </section>

      <section className="py-10">
        <div className="flex justify-around py-20">
          <div
            className={`${selectTabStyle("chart")} cursor-pointer`}
            onClick={() => setTab("chart")}
          >
            Chart
          </div>
          <div
            className={`${selectTabStyle("price")} cursor-pointer`}
            onClick={() => setTab("price")}
          >
            Price
          </div>
        </div>
        {tab === "chart" && <Chart id={id as string} data={chartData} />}
        {tab === "price" && <PriceTable data={data?.quotes.USD} />}
      </section>
    </Layout>
  );
};
