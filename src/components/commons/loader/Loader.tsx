import React from "react";
import animationData from "../../../public/animationData.json";
import Lottie from "lottie-react";
import { useDarkModeStore } from "../ZustandStore/ZustandStore";

export const Loader = () => {
  const dark = useDarkModeStore((state) => state.dark);
  return (
    <div
      className={`w-full min-h-[100vh] flex justify-center items-center ${
        dark ? "bg-black" : "bg-white"
      }`}
    >
      <Lottie
        animationData={animationData}
        style={{ width: 500, height: 500 }}
      />
    </div>
  );
};
