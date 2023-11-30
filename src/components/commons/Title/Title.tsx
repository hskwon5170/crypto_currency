import React from "react";

interface TitleProps {
  title: string;
  className?: string;
}

export const Title = ({ title, className }: TitleProps) => {
  return (
    <div className={`py-10 font-semibold text-2xl sm:text-center ${className}`}>
      {title}
    </div>
  );
};
