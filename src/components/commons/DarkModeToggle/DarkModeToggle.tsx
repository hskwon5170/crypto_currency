import React, { FC } from "react";
import { BsFillSunFill } from "react-icons/bs";
import { BsFillMoonFill } from "react-icons/bs";
import { useAtom, useAtomValue } from "jotai";
import { toggleStore, updateDarkAtom } from "../JotaiStore/darkmode";

interface DarkModeToggleProps {
  className?: string;
}

export const DarkModeToggle: FC<DarkModeToggleProps> = ({ className }) => {
  // const { dark, isToggle, toggleBoth } = useDarkModeStore((state) => ({
  //   dark: state.dark,
  //   isToggle: state.isToggle,
  //   toggleBoth: state.toggleBoth,
  // }));
  const isToggle = useAtomValue(toggleStore);
  const [dark, updateDark] = useAtom(updateDarkAtom);
  const onClickToggle = () => {
    updateDark();
  };

  // const onClickToggle = () => {
  //   toggleBoth();
  // };

  return (
    <div
      className={`rounded-3xl w-[68px] h-[40px] cursor-pointer ${
        dark ? "bg-[#4ffae5]" : "bg-gray-200"
      } shadow-2xl`}
      onClick={onClickToggle}
    >
      <div
        className={`${className} 
      ${!isToggle ? "-translate-x-full" : "translate-x-[-8px]"}  ${
          dark
            ? " transform ease-in-out transition-all rotate-180 "
            : "rotate-[-360deg]"
        } text-white bg-black relative left-[40px] top-[4px] transition-transform duration-300 w-8 h-8 rounded-3xl flex items-center justify-center shadow-2xl`}
      >
        <button>{!dark ? <BsFillMoonFill /> : <BsFillSunFill />}</button>
      </div>
    </div>
  );
};
