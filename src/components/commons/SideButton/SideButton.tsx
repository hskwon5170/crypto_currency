import React from "react";

interface SideButtonProps {
  title: string;
}

export const SideButton = ({ title }: SideButtonProps) => {
  return (
    <div className="coin-rank bg-white p-[3px]  border-2 border-[#e9f2ff] font-bold text-md text-gray-600 text-[5px]  bottom-[4px]">
      {title}
    </div>
  );
};
