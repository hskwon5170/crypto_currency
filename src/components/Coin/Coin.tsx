import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCoin } from "./api/useCoin";
import { Layout } from "../commons/layout/Layout";
import { IoIosArrowForward } from "react-icons/io";
import { useChart } from "./api/useChart";
import { VictoryChart, VictoryArea, VictoryVoronoiContainer } from "victory";
import { Chart } from "./Chart";

const PriceItems = ["High", "Low", "Average"];

export const Coin = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useCoin(id as string);
  // data.
  const sparkLineData = data?.sparkline.map(Number);
  const chartName = String(data?.name.toLowerCase());
  // api limit 제한으로 주석처리함
  // const { data: newsData } = useNews(id as string);
  const [tab, setTab] = useState("chart");

  const { data: chartData, isLoading: chartLoading } = useChart(chartName);

  const quoteChanges =
    Number(data?.change) > 0 ? "text-[#13bf36]" : "text-[#f23d3d]";

  const High = useMemo(() => {
    if (data?.sparkline) {
      const numericSparkLine = data?.sparkline.map(Number);
      return Math.max(...numericSparkLine);
    }
    // return null;
  }, [data?.sparkline]);

  const Low = useMemo(() => {
    if (data?.sparkline) {
      const numericSparkLine = data?.sparkline.map(Number);
      return Math.min(...numericSparkLine);
    }
    // return null;
  }, [data?.sparkline]);

  const Average = useMemo(() => {
    if (data?.sparkline) {
      return (
        data?.sparkline.reduce((acc, cur) => acc + parseFloat(cur), 0) /
        data?.sparkline.length
      );
    }
  }, [data?.sparkline]);

  const priceValues: { [key: string]: number | undefined } = {
    High: High,
    Low: Low,
    Average: Average,
  };

  const options = {
    chart: {
      type: "line" as const,
      height: 350,
      zoom: {
        enabled: true,
      },
    },
    xaxis: {
      type: "datetime",
    },
  };

  return (
    <>
      <Layout title={id as string}>
        <div className="flex items-center gap-3 text-[#737373]">
          <div className="cursor-pointer" onClick={() => navigate(-1)}>
            Coins
          </div>
          <IoIosArrowForward />
          <div>{data?.name}</div>
        </div>

        <section className="flex items-center  gap-3 p-2 py-10 border-b-2 border-[#cee1ff]">
          <img
            src={`https://coinicons-api.vercel.app/api/icon/${data?.symbol?.toLowerCase()}`}
            alt="coinLogo"
            className="coin-logo w-10"
          />
          <span className="coin-name font-extrabold text-2xl">
            {data?.name}
          </span>
          <span className="text-[#737373]">{data?.symbol}</span>
          <div className="coin-rank bg-white p-[3px]  border-2 border-[#e9f2ff] text-md text-gray-600 text-[5px]  bottom-[4px]">
            # {data?.rank}
          </div>
          <div className="flex items-center gap-3 pl-6  bottom-[3px]">
            <div className="font-semibold text-2xl">
              {`$` + Number(data?.price).toFixed(3)}
            </div>
            <div className="coin-rank bg-white p-[3px]  border-2 border-[#e9f2ff] text-md text-gray-600 text-[5px]  bottom-[4px]">
              Live
            </div>
          </div>
        </section>

        <div className="flex items-center gap-3 py-6">
          <strong>Summary</strong>
          <div className="coin-rank p-[3px]  bg-[#e9f2ff] text-md text-gray-600 text-[5px] font-extrabold ">
            by AI
          </div>
          <div>{data?.description}</div>
          <div
            className="text-primary font-bold border-b-4 border-primary cursor-pointer"
            onClick={() => {
              if (data?.websiteUrl) {
                window.open(data.websiteUrl);
              }
            }}
          >
            More
          </div>
        </div>

        <section className="flex items-center">
          <strong className="mr-6">Price chart</strong>
          <div>24h</div>
          <div className={`${quoteChanges} font-semibold py-3 ml-3`}>
            {Number(data?.change) > 0 ? "▲ " : "▼ "}
            {data?.change + `%`}
          </div>
          <div className="flex ml-3 gap-3">
            {PriceItems.map((key) => {
              return (
                <div key={key}>
                  <span>{key}</span> :{" "}
                  <span className="font-bold ml-1">
                    $ {priceValues[key]?.toFixed(3)}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {chartLoading ? (
          <div className="w-full min-h-[300px] bg-transparent flex justify-center items-center">
            <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        ) : chartData ? (
          <Chart chartData={chartData} />
        ) : (
          <div className="flex justify-center items-center w-full min-h-[300px]">
            <strong>Chart is Not Available</strong>
          </div>
        )}

        {/* <section>
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
                {(Number(data?.marketCap) / 1000000000).toFixed(2)}B
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
                {(Number(data?.["24hVolume"]) / 1000000000).toFixed(2)}B
              </div>
            </section>
          </div>
        </section> */}

        <section className="py-10"></section>
      </Layout>
    </>
  );
};
