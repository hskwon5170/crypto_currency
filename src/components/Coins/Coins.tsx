import React from "react";
import { Layout } from "../commons/layout/Layout";
import { useCoins } from "./api/useCoins";
import { ListItem } from "../commons/listItem/ListItem";
import { useNavigate } from "react-router-dom";
import Logo from "../../public/kripto.png";
// 2354e6
// scale opacity

export const Coins = () => {
  const { data } = useCoins();
  const RankerCoins = data?.slice(0, 8);
  const RestCoins = data?.slice(8);
  const navigate = useNavigate();

  return (
    <Layout title="CryptoPulse">
      <div className="flex justify-start items-center py-6 gap-3">
        <img src={Logo} alt="logo" className="w-10" />
        <div className="font-black text-primary text-3xl">CryptoPulse</div>
      </div>
      <div className="grid grid-cols-4 gap-6 my-6">
        {RankerCoins?.map((rcoin) => (
          <div key={rcoin.id}>
            <ListItem
              imageUrl={`https://coinicons-api.vercel.app/api/icon/${rcoin.symbol.toLowerCase()}`}
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
            imageUrl={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
            title={coin.name}
            initial={coin.symbol}
            {...coin}
          />
        </div>
      ))}
    </Layout>
  );
};
