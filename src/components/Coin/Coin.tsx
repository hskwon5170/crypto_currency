import React, { useEffect, useState } from "react";
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
import { CoinCalculator } from "./components/CoinCalculator";

const PriceItems = ["High", "Low", "Average"];

export const Coin = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data } = useCoin(id as string);
  const [usdCurrency, setUsdCurrency] = useState<number>(0);
  const [token, setToken] = useState<number>(0);
  const [tokenToUSD, setTokenToUSD] = useState<number>(0);
  // console.log("tokenToUSD", tokenToUSD);
  // console.log("token", token);
  // console.log("usdCurrency", usdCurrency);
  useEffect(() => {
    setUsdCurrency(data?.market_data.current_price.usd);
  }, [data]);

  const onChangeToken = (val: number) => {
    setToken(val);
  };

  useEffect(() => {
    setTokenToUSD(token * usdCurrency);
  }, [token, usdCurrency]);

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
      <div className="grid grid-cols-10 ">
        <div className="col-span-7">
          <div>
            <CoinNavBar data={data} quoteClass={quoteClass} />
            {chartLoading ? (
              <Spinner />
            ) : chartData ? (
              <Chart chartData={chartData.prices} />
            ) : (
              <Title title="Chart is Not Available" />
            )}
            <div>
              <PriceNavBar
                val={data?.market_data}
                priceItems={["High", "Low", "Average"]}
                quoteClass={quoteClass}
              />
              {data?.description.en && (
                <Description
                  desc={data?.description.en}
                  limit={limit}
                  setLimit={setLimit}
                />
              )}
              <Links links={data?.links} />
            </div>
          </div>
        </div>
        <div className="col-span-3 py-20">
          <CoinCalculator
            data={data!}
            onChangeToken={onChangeToken}
            calculatedUSD={tokenToUSD}
          />
        </div>
      </div>
    </Layout>
  );
};
