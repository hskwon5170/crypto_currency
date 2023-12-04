import React from "react";
import { useDarkModeStore } from "../ZustandStore/ZustandStore";

export const Spinner = () => {
  const { dark } = useDarkModeStore();
  return (
    <div className="w-full min-h-[300px] bg-transparent flex justify-center items-center">
      <div
        className={` h-14 w-14 animate-spin rounded-full border-4  ${
          dark ? "border-black border-t-white" : "border-white border-t-black"
        }`}
      />
    </div>
  );
};
