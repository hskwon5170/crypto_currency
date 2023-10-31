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
      className={`relative max-w-full m-auto ${isListPage ? "px-3" : "p-6"}`}
    >
      <div className="flex gap-6"></div>
      <div>{children}</div>
    </div>
  );
};
