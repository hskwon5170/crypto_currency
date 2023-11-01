import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCoin } from "./api/useCoin";
import { Layout } from "../commons/layout/Layout";
import { IoIosArrowForward } from "react-icons/io";
import { useChart } from "./api/useChart";
import { VictoryChart, VictoryArea, VictoryVoronoiContainer } from "victory";
import { Chart } from "./Chart";
import "./index.css";

const PriceItems = ["High", "Low", "Average"];

export const Coin = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data } = useCoin(id as string);
  const descriptionData = data?.description.en ?? "";

  // api limit 제한으로 주석처리함
  // const { data: newsData } = useNews(id as string);
  // const [tab, setTab] = useState("chart");

  const { data: chartData, isLoading: chartLoading } = useChart(
    data?.id as string
  );
  // console.log("chartData", chartData);

  const quoteChanges =
    Number(data?.market_data.market_cap_change_percentage_24h) > 0
      ? "text-[#13bf36]"
      : "text-[#f23d3d]";

  const priceValues: { [key: string]: number | undefined } = {
    High: data?.market_data.high_24h.usd,
    Low: data?.market_data.low_24h.usd,
    Average:
      (data?.market_data.high_24h.usd + data?.market_data.low_24h.usd) / 2,
  };

  const [limit, setLimit] = useState<number>(300);
  // console.log("limit", limit);
  const toggleElipsis = (str: string, limit: number) => {
    return {
      String: str.slice(0, limit),
      isShowMore: str.length > limit,
    };
  };
  const onClickMore = (str: string) => {
    setLimit(str.length);
  };
  const onClickClose = () => {
    setLimit(300);
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

        <section className="flex items-center  gap-3 p-2 py-10">
          <img
            src={data?.image.large}
            alt="coinLogo"
            className="coin-logo w-10"
          />
          <span className="coin-name font-extrabold text-2xl">
            {data?.name}
          </span>
          <span className="text-[#737373]">{data?.symbol}</span>
          <div className="coin-rank bg-white p-[3px]  border-2 border-[#e9f2ff] font-bold text-md text-gray-600 text-[5px]  bottom-[4px]">
            # {data?.coingecko_rank}
          </div>
          <div className="flex items-center gap-3 pl-6  bottom-[3px]">
            <div className="font-semibold text-2xl">
              {`$` + Number(data?.market_data.current_price.usd).toFixed(3)}
            </div>
            <div className="coin-rank bg-white p-[3px]  border-2 border-[#e9f2ff] font-bold text-md text-gray-600 text-[5px]  bottom-[4px]">
              Live
            </div>
          </div>
        </section>

        <section className="flex items-center">
          <strong className="mr-6">Price chart</strong>
          <div>24h</div>
          <div className={`${quoteChanges} font-semibold py-3 ml-3`}>
            {Number(
              data?.market_data.market_cap_change_percentage_24h.toFixed(2)
            ) > 0
              ? "▲ "
              : "▼ "}
            {data?.market_data.market_cap_change_percentage_24h.toFixed(2) +
              `%`}
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
          <Chart chartData={chartData.prices} />
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

        {data?.description.en && (
          <section className="py-10">
            <div className="flex flex-col items-start gap-3 py-6">
              <strong>About</strong>

              <div
                // className="linear-gradient"
                dangerouslySetInnerHTML={{
                  __html: toggleElipsis(data.description.en ?? "", limit)
                    .String,
                }}
              />
              <span>
                {toggleElipsis(data.description.en ?? "", limit).isShowMore ? (
                  <div
                    className="text-[#fc72ff]  cursor-pointer"
                    onClick={() => onClickMore(data.description.en ?? "")}
                  >
                    Show more
                  </div>
                ) : (
                  <div
                    className="text-[#fc72ff]  cursor-pointer"
                    onClick={onClickClose}
                  >
                    Hide
                  </div>
                )}
              </span>
            </div>
          </section>
        )}
      </Layout>
    </>
  );
};
