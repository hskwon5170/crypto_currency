import React from "react";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

export const Layout = ({ title, children }: LayoutProps) => {
  return (
    <div className="relative max-w-[480px] min-h-[100vh] m-auto">
      <title>{title}</title>
      {children}
    </div>
  );
};
