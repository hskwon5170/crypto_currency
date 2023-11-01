import React from "react";
import animationData from "../../../public/animationData.json";
import Lottie from "lottie-react";

export const Loader = () => {
  return (
    <div className="w-full min-h-[100vh] flex justify-center items-center bg-black">
      <Lottie
        animationData={animationData}
        style={{ width: 500, height: 500 }}
      />
    </div>
  );
};
