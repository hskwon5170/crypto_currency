import { atom } from "jotai";
import { atomWithImmer } from "jotai-immer";

interface TopbarState {
  color: {
    background: string;
    text: string;
    logo: string;
  };
  position: "static" | "sticky";
}

const landing_top: TopbarState = {
  color: {
    background: "black",
    text: "#fff",
    logo: "#fff",
  },
  position: "static",
};

const normal: TopbarState = {
  color: {
    background: "#1e1e1e",
    text: "#3c3c3c",
    logo: "#3c3c3c",
  },
  position: "sticky",
};

export const isLandingTop = () =>
  window.location.pathname === "/coins" && window.scrollY === 0;

export const topbarAtom = atomWithImmer<TopbarState>(
  isLandingTop() ? landing_top : normal
);

export const onNormalTopbarAtom = atom(null, (get, set) => {
  set(topbarAtom, normal);
});

export const onLandingAtom = atom(null, (get, set) => {
  set(topbarAtom, landing_top);
});
