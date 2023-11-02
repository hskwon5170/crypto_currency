import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCoin } from "./api/useCoin";
import { Layout } from "../commons/layout/Layout";
import { useChart } from "./api/useChart";
import { Chart } from "./Chart";
import "./index.css";
import { Title } from "../commons/Title/Title";
import { Description } from "./components/Description";
import { Spinner } from "../commons/Spinner/Spinner";
import { useQuoteChanges } from "../../hooks/useQuoteChanges";
import { PriceNavBar } from "./components/PriceNavBar";
import { CoinNavBar } from "./components/CoinNavBar";
import { Navigation } from "./components/Navigation";
import { Links } from "./components/Links";

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

  const { quoteClass } = useQuoteChanges(
    data?.market_data.market_cap_change_percentage_24h
  );

  const [limit, setLimit] = useState<number>(300);

  const onClickMoveToCoinList = () => {
    navigate(-1);
  };

  return (
    <Layout title="">
      <Navigation onClick={onClickMoveToCoinList} name={data?.name as string} />
      <div className="grid grid-cols-10">
        <div className="col-span-10">
          <CoinNavBar data={data} />

          {chartLoading ? (
            <Spinner />
          ) : chartData ? (
            <Chart chartData={chartData.prices} />
          ) : (
            <Title title="Chart is Not Available" />
          )}

          <PriceNavBar
            val={data?.market_data}
            priceItems={["High", "Low", "Average"]}
            quoteClass={quoteClass}
          />

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
            <Description
              desc={data?.description.en}
              limit={limit}
              setLimit={setLimit}
            />
          )}
          <Links links={data?.links} />
        </div>
        {/* <div className="col-span-2">
          <div className="Uniswap">
            <SwapWidget />
          </div>
        </div> */}
      </div>
    </Layout>
  );
};
