import React, { FC } from "react";
import { IoIosArrowForward } from "react-icons/io";

interface NavigationProps {
  onClick: () => void;
  name: string;
}

export const Navigation: FC<NavigationProps> = ({ onClick, name }) => {
  return (
    <div className="flex items-center gap-3 text-[#737373]">
      <div className="cursor-pointer" onClick={onClick}>
        Coins
      </div>
      <IoIosArrowForward />
      <div>{name}</div>
    </div>
  );
};
