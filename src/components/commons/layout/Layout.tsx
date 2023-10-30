import React from "react";
import CoinLogo from "../../../public/kripto.png";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

export const Layout = ({ title, children }: LayoutProps) => {
  return (
    // <div className="relative max-w-[40rem] min-h-screen m-auto ">
    <div className="relative max-w-full m-auto p-6 bg-blue-100">
      {/* {isDetail && (
        <div className="flex">
          <IoIosArrowBack />
        </div>
      )} */}
      <div className="flex gap-6">
        {/* <img src={imageUrl} alt="logo" className="w-10 h-auto" /> */}
        {/* <div className="text-4xl text-primary" style={{ fontWeight: 700 }}>
          {title}
        </div> */}
      </div>
      <div className="py-10">{children}</div>
    </div>
  );
};
