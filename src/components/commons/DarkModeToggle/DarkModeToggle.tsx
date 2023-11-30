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
    <div className={className}>
      <button onClick={toggleDarkMode}>
        {!dark ? <BsFillMoonFill /> : <BsFillSunFill />}
      </button>
    </div>
  );
};
