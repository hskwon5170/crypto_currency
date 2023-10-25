import React from "react";
import animationData from "../../../public/animationData.json";
import Lottie from "lottie-react";

export const Loader = () => {
  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <Lottie
        animationData={animationData}
        style={{ width: 500, height: 500 }}
      />
    </div>
  );
};
