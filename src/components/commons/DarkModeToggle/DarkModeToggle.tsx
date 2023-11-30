import React, { FC } from "react";
import { useDarkModeStore } from "../ZustandStore/ZustandStore";
import { BsFillSunFill } from "react-icons/bs";
import { BsFillMoonFill } from "react-icons/bs";

interface DarkModeToggleProps {
  className?: string;
}

export const DarkModeToggle: FC<DarkModeToggleProps> = ({ className }) => {
  const { dark, toggleDarkMode } = useDarkModeStore();

  return (
    <div
      className={`${className}  ${
        dark
          ? "text-white bg-gray-800 transform rotate-[360deg] ease-in-out transition-all duration-300"
          : "text-black bg-gray-200"
      } w-8 h-8 rounded-xl flex items-center justify-center shadow-2xl `}
    >
      <button onClick={toggleDarkMode}>
        {!dark ? <BsFillMoonFill /> : <BsFillSunFill />}
      </button>
    </div>
  );
};
