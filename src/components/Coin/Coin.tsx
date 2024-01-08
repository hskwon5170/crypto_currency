import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCoin } from "./api/useCoin";
import { Layout } from "../commons/layout/Layout";
import { useChart } from "./api/useChart";
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
import { CandleStickChart } from "./CandleStickChart";
import { ChartIcon } from "./ChartIcon";
import { ApexArea } from "./ApexArea";

export const Coin = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data } = useCoin(id as string);
  const [usdCurrency, setUsdCurrency] = useState<number>(0);
  const [token, setToken] = useState<number>(0);
  const [tokenToUSD, setTokenToUSD] = useState<number>(0);
  const [currency, setCurrency] = useState<string>("usd");

  const coinId = useMemo(() => data?.id, [data?.id]);

  useEffect(() => {
    setUsdCurrency(data?.market_data.current_price[currency]);
  }, [data, currency]);
  const onChangeCurrency = (cur: string) => {
    setCurrency(cur);
  };

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
  const [isArea, setIsArea] = useState(true);

  const onClickMoveToCoinList = () => {
    navigate(-1);
  };

  const onClickChartIcon = () => {
    setIsArea(!isArea);
  };

  return (
    <Layout title="">
      <Navigation onClick={onClickMoveToCoinList} name={data?.name as string} />
      <div className="grid grid-cols-10 sm:flex sm:flex-col">
        <div className="col-span-7">
          <div>
            <CoinNavBar data={data} quoteClass={quoteClass} />
            {chartLoading ? (
              <Spinner />
            ) : chartData ? (
              <div>
                {/* <div className="w-[55vw] sm:w-full sm:relative sm:right-[4.3rem]"> */}
                {isArea ? (
                  <div>
                    {/* <Chart chartData={chartData.prices} /> */}
                    <ApexArea chartData={chartData.prices} />
                  </div>
                ) : (
                  <CandleStickChart coinId={coinId as string} />
                )}
                {/* </div> */}
                <div className="flex justify-end" onClick={onClickChartIcon}>
                  <ChartIcon isArea={isArea} />
                </div>
              </div>
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
        <div className="col-span-3 py-20 ml-10  sm:flex sm:justify-center">
          <CoinCalculator
            data={data!}
            onChangeToken={onChangeToken}
            calculatedUSD={tokenToUSD}
            onChangeCurrency={onChangeCurrency}
            currency={currency}
          />
        </div>
      </div>
    </Layout>
  );
};
