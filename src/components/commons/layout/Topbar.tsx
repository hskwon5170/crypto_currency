import React, { useMemo } from "react";
import { useTopbarTheme } from "../../../hooks/useTopbarTheme";
import { GiPlanetCore } from "react-icons/gi";
import { useAtom } from "jotai";
import { updateDarkAtom } from "../JotaiStore/JotaiStore";
import { DarkModeToggle } from "../DarkModeToggle/DarkModeToggle";
import { useLocation, useNavigate } from "react-router-dom";

export const Topbar = () => {
  const navigate = useNavigate();
  const { topbar } = useTopbarTheme();
  const [dark] = useAtom(updateDarkAtom);

  const location = useLocation();
  // console.log("location", location.pathname === "/coins");

  const isList = useMemo(
    () => location.pathname === "/coins",
    [location.pathname]
  );

  const onClickLogo = () => {
    isList
      ? window.scrollTo({ top: 0, behavior: "smooth" })
      : navigate("/coins");
  };

  return (
    <div
      className="flex justify-between items-center py-6 transition-all duration-300 top-0 z-10 px-40 mb-6 backdrop-blur-sm bg-black/50 sm:px-2"
      style={{
        position: topbar.position,
        color: topbar.color.text,
        background: topbar.color.background,
      }}
    >
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={onClickLogo}
      >
        <GiPlanetCore className="text-3xl" />
        <div
          className={`font-black text-3xl mb-1 sm:text-[6vw] ${
            dark ? "text-white" : "text-black"
          }`}
        >
          Crypto
        </div>
      </div>
      <DarkModeToggle />
    </div>
  );
};
