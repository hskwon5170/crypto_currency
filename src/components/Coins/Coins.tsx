import React from "react";
import { Layout } from "../commons/layout/Layout";
import { useCoins } from "./api/useCoins";
import { ListItem } from "../commons/listItem/ListItem";
import { useNavigate } from "react-router-dom";

export const Coins = () => {
  const { data } = useCoins();
  const navigate = useNavigate();
  // console.log("data", data);

  return (
    <Layout title="MyKriptos">
      {data?.map((coin) => (
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
