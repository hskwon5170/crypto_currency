import React from "react";

export const Spinner = () => {
  return (
    <div className="w-full min-h-[300px] bg-transparent flex justify-center items-center">
      <div className="border-gray-600 h-14 w-14 animate-spin rounded-full border-8 border-t-fuchsia-800" />
    </div>
  );
};
