import React from "react";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
  isListPage?: boolean;
}

export const Layout = ({
  title,
  children,
  isListPage = false,
}: LayoutProps) => {
  return (
    // <div className="relative max-w-[40rem] min-h-screen m-auto ">
    <div
      className={`relative max-w-[80%]  m-auto sm:max-w-full  sm:p-3 sm:m-0 sm:overflow-x-hidden ${
        isListPage ? "px-3" : "p-6"
      }`}
    >
      <div>{children}</div>
    </div>
  );
};
