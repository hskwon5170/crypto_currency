import React from "react";
import { DarkModeToggle } from "../DarkModeToggle/DarkModeToggle";

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
      <div className="absolute right-[-10px] top-8 sm:right-[-10px] sm:top-9">
        <DarkModeToggle />
      </div>
      <div>{children}</div>
    </div>
  );
};
