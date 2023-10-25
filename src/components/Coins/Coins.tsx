import React from "react";
import { Layout } from "../commons/layout/Layout";
import { useCoins } from "./api/useCoins";
import { ListItem } from "../commons/listItem/ListItem";
import { useNavigate } from "react-router-dom";
import Logo from "../../public/kripto.png";

export const Coins = () => {
  const { data } = useCoins();
  const navigate = useNavigate();

  return (
    <Layout title="CryptoPulse">
      <div className="flex justify-start items-center py-6 gap-3">
        <img src={Logo} alt="logo" className="w-10" />
        <div className="font-black text-primary text-3xl">CryptoPulse</div>
      </div>
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
