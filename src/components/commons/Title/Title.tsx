import React from "react";

interface TitleProps {
  title: string;
}

export const Title = ({ title }: TitleProps) => {
  return <div className=" py-10 font-semibold text-2xl ">{title}</div>;
};
