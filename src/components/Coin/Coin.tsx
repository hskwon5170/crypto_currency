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
import { News } from "../News/News";
import { useNews } from "../News/api/useNews";

export const Coin = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useCoin(id as string);
  // api limit 제한으로 주석처리함
  // const { data: newsData } = useNews(id as string);
  const [tab, setTab] = useState("chart");

  const { data: chartData, isLoading } = useCoinChart(id as string);
  const quoteChanges =
    data?.quotes.USD.percent_change_24h! > 0
      ? "text-[#13bf36]"
      : "text-[#f23d3d]";

  return (
    <>
      <Layout title={id as string}>
        <div className="flex items-center text-2xl gap-3">
          <IoIosArrowBack
            onClick={() => navigate(-1)}
            className="cursor-pointer hover:text-primary"
          />
          <span>{data?.symbol}</span>
        </div>

        <section className="py-10 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src={`https://coinicons-api.vercel.app/api/icon/${data?.symbol?.toLowerCase()}`}
              alt="coinLogo"
              className="coin-logo w-14"
            />
            <span className="coin-name text-primary font-extrabold text-5xl">
              {data?.name}
            </span>
          </div>
          <div className="coin-rank bg-blue-200 p-2 rounded-lg shadow-md text-primary text-2xl font-semibold min-w-[200px] text-center">
            <span className="pr-2">🏆</span> Rank # {data?.rank}
          </div>
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
        <div className="py-11">
          {isLoading ? (
            <div className="w-full min-h-[300px] bg-transparent flex justify-center items-center">
              <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            </div>
          ) : chartData ? (
            <Chart id={id as string} data={chartData} />
          ) : (
            <div className="flex justify-center items-center w-full min-h-[300px]">
              <strong>Chart is Not Available</strong>
            </div>
          )}
        </div>

        <section>
          <div className="grid grid-cols-2 bg-white rounded-md min-h-[100px]">
            <section className="flex flex-col items-center p-6 border-r-2 border-gray-200">
              <div className="flex items-center gap-1 text-gray-400">
                <div>Market Cap</div>
                <Tooltip
                  title="Current Price * Circulating Supply"
                  className="cursor-pointer"
                >
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
                <Tooltip
                  title="Total value of crypto traded in the past 24 hours"
                  className="cursor-pointer"
                >
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
          <PriceTable data={data?.quotes.USD} />
        </section>
        {/* <div className="bg-red-400">
          {newsData &&
            newsData.map((news) => {
              console.log("news", news);
              return <News newsData={news} />;
            })}
        </div> */}
      </Layout>
    </>
  );
};
