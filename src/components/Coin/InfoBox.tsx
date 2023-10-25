import React from "react";

export const InfoBox = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-white rounded-md min-h-[100px]">{children}</div>;
};
