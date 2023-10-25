import React from "react";
import CoinLogo from "../../../public/kripto.png";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
  imageUrl?: string;
}

export const Layout = ({
  title,
  children,
  imageUrl = CoinLogo,
}: LayoutProps) => {
  return (
    <div className="relative max-w-[35rem] min-h-screen m-auto p-10 ">
      <div className="flex gap-6">
        <img src={imageUrl} alt="logo" className="w-10 h-auto" />
        <div className="text-4xl text-primary" style={{ fontWeight: 700 }}>
          {title}
        </div>
      </div>
      <div className="py-10">{children}</div>
    </div>
  );
};
