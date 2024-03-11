import React, { useMemo } from "react";
import { useTopbarTheme } from "../../../hooks/useTopbarTheme";
import { GiPlanetCore } from "react-icons/gi";
import { useAtom } from "jotai";
import { updateDarkAtom } from "../JotaiStore/darkmode";
import { DarkModeToggle } from "../DarkModeToggle/DarkModeToggle";
import { useLocation, useNavigate } from "react-router-dom";

export const Topbar = () => {
  const navigate = useNavigate();
  const { topbar } = useTopbarTheme();
  const [dark] = useAtom(updateDarkAtom);

  const location = useLocation();
  // console.log("location", location.pathname === "/coins");

  const isList = useMemo(() => location.pathname === "/coins", [location.pathname]);

  const onClickLogo = () => {
    isList ? window.scrollTo({ top: 0, behavior: "smooth" }) : navigate("/coins");
  };

  return (
    <div
      className="top-0 z-10 flex items-center justify-between px-40 py-6 mb-6 transition-all duration-300 bg-black bg-opacity-10 backdrop-blur-sm sm:px-2"
      style={{
        position: topbar.position,
        color: topbar.color.text,
        background: topbar.color.background,
      }}
    >
      <div className={`flex items-center gap-3 cursor-pointer ${dark ? "text-white" : "text-black"}`} onClick={onClickLogo}>
        <GiPlanetCore className="text-3xl" />
        <div className="font-black text-3xl mb-1 sm:text-[6vw]">Crypto</div>
      </div>
      <DarkModeToggle />
    </div>
  );
};
