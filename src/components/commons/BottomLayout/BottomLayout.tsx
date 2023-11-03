import React from "react";

interface BottomLayoutProps {
  title?: string;
  subTitle?: string;
  children?: React.ReactNode;
}

export const BottomLayout = ({
  title,
  subTitle,
  children,
}: BottomLayoutProps) => {
  return (
    <div className="py-10 max-w-[80%] sm:max-w-[90%]">
      <strong className="text-3xl">{title}</strong>
      <strong className=" text-[#737373]">{subTitle}</strong>
      <div className="py-6">{children}</div>
    </div>
  );
};
