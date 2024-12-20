import React, { useEffect, useMemo, useRef, useState } from "react";
import { Layout } from "../commons/layout/Layout";
import { useCoins } from "./api/useCoins";
import Table from "../commons/Table/Table";
import { CoinDetail, Column } from "./types";
import { useNavigate } from "react-router-dom";
import { Title } from "../commons/Title/Title";
import { PriceElement } from "../commons/PriceElement/PriceElement";
import { CanvasChart } from "./components/CanvasChart";
import { AiOutlineArrowUp } from "react-icons/ai";
import { CoinSearch } from "../Coin/CoinSearch";
import { useAtom, useSetAtom } from "jotai";
import { updateDarkAtom } from "../commons/JotaiStore/darkmode";
import {
  calculatedValueAtom,
  inputValueAtom,
  selectCurrencyAtom,
} from "../commons/JotaiStore/calculator";

export const Coins = () => {
  const navigate = useNavigate();
  // const dark = useDarkModeStore((state) => state.dark);
  const [dark] = useAtom(updateDarkAtom);

  const { data } = useCoins();
  const [, setInputValue] = useAtom(inputValueAtom);
  const setCalculated = useSetAtom(calculatedValueAtom);
  const setSelectedCurrency = useSetAtom(selectCurrencyAtom);

  const handleCoinClick = (coinId: string) => {
    setInputValue(0);
    setCalculated(0);
    setSelectedCurrency("usd");
    navigate(`/coins/${coinId}`);
  };

  const columns = useMemo<Column<CoinDetail>[]>(
    () => [
      {
        accessor: "market_cap_rank",
        Header: () => <div className="sm:hidden"></div>,
        Cell: ({ value }) => {
          return <div className="sm:hidden">{value}</div>;
        },
      },
      {
        accessor: "id",
        Header: () => <div>Token name</div>,
        Cell: ({ row }: any) => {
          return (
            <div className="flex gap-5 items-center justify-start ml-10 py-6 sm:pr-[0.5vw] sm:ml-1">
              <img
                src={row.original.image}
                alt="Coin"
                className="w-[2.3rem] h-[2.3rem]"
              />
              <div className="flex flex-col justify-center items-start">
                <span className="font-bold text-lg whitespace-nowrap">
                  {row.original.id}
                </span>
                <span>{row.original.symbol}</span>
              </div>
            </div>
          );
        },
      },
      {
        accessor: "current_price",
        Header: () => <div className="sm:pl-3">Price</div>,
        Cell: ({ row }: any) => (
          <div>
            <div className="sm:hidden md:hidden lg:block">
              <PriceElement price={Number(row.original.current_price)} />
            </div>
            <div className="lg:hidden sm:flex sm:flex-col sm:items-end">
              <PriceElement price={Number(row.original.current_price)} />
              <div className="quoteChangeClass sm:text-[3vw] sm:font-bold">
                {quoteChanges(row.original.price_change_percentage_24h)}
              </div>
            </div>
          </div>
        ),
      },
      {
        accessor: "price_change_24h",
        Header: () => <div className="sm:hidden">Change</div>,
        Cell: ({ row }: any) => {
          return (
            <div className="quoteChangeClass sm:hidden">
              {quoteChanges(row.original.price_change_percentage_24h)}
            </div>
          );
        },
      },
      {
        accessor: "market_cap",
        Header: () => <div className="sm:hidden">Market cap</div>,
        Cell: ({ value }) => (
          <div className="sm:hidden">
            <PriceElement price={value} billion />
          </div>
        ),
      },
      {
        accessor: "total_volume",
        Header: () => <div className="sm:hidden">Volume</div>,
        Cell: ({ value }) => (
          <div className="sm:hidden">
            <PriceElement price={value} billion />
          </div>
        ),
      },
      {
        accessor: "sparkline_in_7d",
        Header: () => <div className="sm:hidden"></div>,
        Cell: ({ row }: any) => {
          return (
            <div className="sm:hidden">
              <CanvasChart row={row} />
            </div>
          );
        },
      },
    ],
    []
  );
  const buttonRef = useRef<HTMLDivElement>(null);
  const onClickMoveToRef = () => {
    if (buttonRef.current) {
      buttonRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // const [search, setSeacrh] = useState<string>("");
  // const debounceSearch = useDebounce(search, 250);
  // const HandleInputChanges = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     e.preventDefault();
  //     setSeacrh(e.target.value);
  //   },
  //   []
  // );

  const [searches, setSearches] = useState("");
  const [filted, setFilted] = useState(data);
  const onSearchChange = (value: string) => {
    setSearches(value);
  };

  useEffect(() => {
    const filted = data?.filter((el) => el.id.includes(searches));
    setFilted(filted);
  }, [searches, data]);

  const [inputChanged, setInputChanged] = useState<boolean>(false);
  // const filtedData = data?.filter((el) => el.id.includes(debounceSearch));

  useEffect(() => {
    if (searches === "") {
      setInputChanged(false);
    } else {
      setInputChanged(true);
    }
  }, [searches]);

  return (
    <>
      <Layout isListPage title="List">
        <div>
          {/* <PopUpModal /> */}

          <Title
            title="Top Tokens on Crypto"
            className={dark ? "text-white" : "text-black"}
          />
          <div ref={buttonRef}></div>
          <CoinSearch
            // onChange={HandleInputChanges}
            // value={search}
            onSearchChange={onSearchChange}
          />
          <Table
            columns={columns}
            data={!inputChanged ? data : filted}
            onRowClick={handleCoinClick}
          />
          <div className="fixed bottom-5 right-10 sm:hidden">
            <div className="transition-all duration-300 transform hover:scale-110">
              <button
                className="bg-gray-400 opacity-80 hover:opacity-90 text-white px-4 py-4 rounded-3xl shadow-lg hover:bg-[#4ffae5] hover:text-black active:bg-gray-600 focus:outline-none   focus:ring-opacity-50 animate-bounce"
                onClick={onClickMoveToRef}
              >
                <AiOutlineArrowUp />
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
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
