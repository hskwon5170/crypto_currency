import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export const ContentsLayout = ({ children }: LayoutProps) => {
  return (
    <div className="flex justify-center">
      <div className="w-full flex flex-col items-start">{children}</div>
    </div>
  );
};
