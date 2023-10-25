import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import { useCoin } from "./api/useCoin";
import { Layout } from "../commons/layout/Layout";

export const Coin = () => {
  const { id } = useParams();
  const { data, isLoading } = useCoin(id as string);
  console.log("디테일", data);
  return (
    <div>
      {/* {isLoading ? (
        <div>로딩중....</div>
      ) : ( */}
      <Layout
        title={id as string}
        imageUrl={`https://coinicons-api.vercel.app/api/icon/${data?.symbol.toLocaleLowerCase()}`}
      >
        <div>123123</div>
      </Layout>
      {/* )} */}
    </div>
  );
};
