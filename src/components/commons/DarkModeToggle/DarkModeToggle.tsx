import React, { FC, useState } from "react";
import { useDarkModeStore } from "../ZustandStore/ZustandStore";
import { BsFillSunFill } from "react-icons/bs";
import { BsFillMoonFill } from "react-icons/bs";

interface DarkModeToggleProps {
  className?: string;
}

export const DarkModeToggle: FC<DarkModeToggleProps> = ({ className }) => {
  const { dark, toggleDarkMode } = useDarkModeStore();
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const onClickToggle = () => {
    toggleDarkMode();
    setIsToggle((prev) => !prev);
  };

  return (
    <div
      className={`rounded-md w-[50px] absolute right-10 cursor-pointer bg-[#f3f4f6] shadow-2xl`}
      onClick={onClickToggle}
    >
      <div
        className={`${className} 
      ${isToggle ? "-translate-x-full" : "translate-x-0"}  ${
          dark ? " transform ease-in-out transition-all" : ""
        } text-white bg-black relative left-6  transition-transform duration-75 w-8 h-8 rounded-xl flex items-center justify-center shadow-2xl `}
      >
        <button>{!dark ? <BsFillMoonFill /> : <BsFillSunFill />}</button>
      </div>
    </div>
  );
};
