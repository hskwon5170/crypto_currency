import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

interface ListItemProps {
  rank?: number;
  title: string;
  initial: string;
  imageUrl?: string;
  id?: string;
  isRanker?: boolean;
}

const hoverEffect =
  "hover:bg-[#2354e6] hover:scale-105 hover:opacity-70 transition-all duration-30";

export const ListItem = ({
  rank,
  title,
  initial,
  imageUrl,
  id,
  isRanker = false,
}: ListItemProps) => {
  const navigate = useNavigate();
  const goDetail = () => {
    navigate(`/coins/${id}`);
  };

  return (
    <div
      className={`${
        isRanker
          ? " w-[10rem] h-[10rem] bg-white flex flex-col p-2 sm:w-36 sm:h-36"
          : "flex items-center justify-around w-full  p-4"
      } cursor-pointer bg-white rounded-md shadow-sm hover:${hoverEffect} `}
      onClick={goDetail}
    >
      <div className="px-3 text-primary font-black text-xl ">{rank}</div>
      {isRanker ? (
        <div className="flex flex-col items-center">
          <img src={imageUrl} alt="coin" className="w-10 h-10" />
          <div className="mt-3 text-center">
            <div className="font-black text-[13px] whitespace-nowrap">
              {title}
            </div>
            <div className="text-[#9D9D9D] text-[12px]">{initial}</div>
          </div>
        </div>
      ) : (
        <div className="min-w-[300px] flex gap-3 ">
          <img src={imageUrl} alt="coin" className="w-12 h-12" />
          <div className="flex flex-col">
            <div className="font-black text-xl">{title}</div>
            <div className="text-[#9D9D9D] font-md">{initial}</div>
          </div>
        </div>
      )}

      {!isRanker && <IoIosArrowForward />}
    </div>
  );
};
