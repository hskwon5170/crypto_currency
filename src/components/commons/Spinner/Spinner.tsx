import React from "react";

export const Spinner = () => {
  return (
    <div className="w-full min-h-[300px] bg-transparent flex justify-center items-center">
      <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
};
