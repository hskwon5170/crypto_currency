import React, { useMemo } from "react";
import { Layout } from "../commons/layout/Layout";
import { useCoins } from "./api/useCoins";
import { ListItem } from "../commons/listItem/ListItem";
import Logo from "../../public/kripto.png";
import Table from "../commons/Table/Table";
import { CoinDetail } from "./types";

type Column<T extends object> = {
  accessor: keyof T;
  Header: string;
};

export const Coins = () => {
  const { data } = useCoins();
  // console.log("data", data);
  const RankerCoins = data?.slice(0, 8);
  const RestCoins = data?.slice(8);

  const columnData: Column<CoinDetail>[] = [
    {
      accessor: "id",
      Header: "Id",
    },
  ];

  const columns = useMemo(() => columnData, []);

  const datas = useMemo(
    () => [
      {
        email: "이메일이에용",
        walletID: "아이디에용",
        created_at: "2021-08-03 01:14:47",
        edited_at: "2021-08-03 01:15:49",
        coin_list: ["TRV", "BTC", "BCH", "ETH"],
      },
    ],
    []
  );

  return (
    <Layout title="CryptoPulse">
      <Table columns={columns} data={data} />
      <div className="flex justify-start items-center py-6 gap-3">
        <img src={Logo} alt="logo" className="w-10" />
        <div className="font-black text-black text-3xl">CryptoPulse</div>
      </div>
      {/* <div className="grid grid-cols-4 gap-6 my-6"> */}
      <div className="grid grid-cols-2 justify-items-center align-items-center md:grid-cols-4 gap-6 my-6">
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
      ))}
    </Layout>
  );
};
