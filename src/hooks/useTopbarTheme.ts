import React, { useEffect } from "react";
import { useSetAtom, useAtom } from "jotai";
import { useLocation } from "react-router-dom";
import {
  onLandingAtom,
  onNormalTopbarAtom,
  topbarAtom,
} from "../components/commons/JotaiStore/topbar";

export const useTopbarTheme = () => {
  const [topbar] = useAtom(topbarAtom);
  const setNormalTopbar = useSetAtom(onNormalTopbarAtom);
  const setLandingTopbar = useSetAtom(onLandingAtom);
  const location = useLocation();

  useEffect(() => {
    const handler = () => {
      if (window.scrollY === 0) {
        setLandingTopbar();
      } else {
        setNormalTopbar();
      }
    };

    // if (window.location.pathname === "/coins/*") {
    handler();
    window.addEventListener("scroll", handler);
    // } else {
    //   handler();
    //   window.removeEventListener("scroll", handler);
    // }

    return () => window.removeEventListener("scroll", handler);
  }, [setLandingTopbar, setNormalTopbar, location.pathname]);

  return { topbar };
};
