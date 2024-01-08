import React from "react";
import { Topbar } from "./Topbar";

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
    // <div className="relative min-h-screen m-auto ">
    <div className={`m-auto sm:max-w-full sm:m-0 ${isListPage ? "" : ""}`}>
      <Topbar />
      <div className="w-[80%] m-auto sm:w-full sm:px-3">{children}</div>
    </div>
  );
};
