import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

interface ListItemProps {
  rank: number;
  title: string;
  initial: string;
  imageUrl?: string;
  id?: string;
}

export const ListItem = ({
  rank,
  title,
  initial,
  imageUrl,
  id,
}: ListItemProps) => {
  const navigate = useNavigate();
  const goDetail = () => {
    navigate(`/coins/${id}`);
  };

  return (
    <div
      className="flex items-center justify-around w-full bg-white rounded-md p-4 cursor-pointer"
      onClick={goDetail}
    >
      <div className="px-3 text-primary font-black text-xl">{rank}</div>
      <div className="min-w-[300px] flex gap-3 ">
        <img src={imageUrl} alt="coin" className="w-12 h-12" />
        <div className="flex flex-col">
          <div className="font-black text-xl">{title}</div>
          <div className="text-[#9D9D9D] font-md">{initial}</div>
        </div>
      </div>
      <IoIosArrowForward />
    </div>
  );
};
