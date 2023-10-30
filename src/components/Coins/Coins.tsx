import React from "react";
import { Layout } from "../commons/layout/Layout";
import { useCoins } from "./api/useCoins";
import { ListItem } from "../commons/listItem/ListItem";
import Logo from "../../public/kripto.png";

export const Coins = () => {
  const { data } = useCoins();
  const RankerCoins = data?.slice(0, 8);
  const RestCoins = data?.slice(8);

  return (
    <Layout title="CryptoPulse">
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
