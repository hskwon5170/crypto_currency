import React from "react";
import { Layout } from "../commons/layout/Layout";
import { useCoins } from "./api/useCoins";
import { ListItem } from "../commons/listItem/ListItem";

export const Coins = () => {
  const { data } = useCoins();
  console.log("data", data);

  return (
    <Layout title="MyKriptos">
      {data?.map((coin) => (
        <div key={coin.id} className="py-3">
          <ListItem
            imageUrl={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
            rank={coin.rank}
            title={coin.name}
            initial={coin.symbol}
          />
        </div>
      ))}
    </Layout>
  );
};
