import React, { Dispatch, SetStateAction } from "react";
import { BottomLayout } from "../../commons/BottomLayout/BottomLayout";

interface DescriptionProps {
  desc: string;
  onClick?: () => void;
  limit?: number;
  setLimit?: Dispatch<SetStateAction<number>>;
}

export const Description = ({
  desc,
  onClick,
  limit,
  setLimit,
}: DescriptionProps) => {
  const onClickMore = (str: string) => {
    setLimit?.(str.length);
  };

  const onClickClose = () => {
    setLimit?.(300);
  };

  const toggleEllipsis = (str: string, limit?: number) => {
    return {
      Elements: str.slice(0, limit),
      isShowMore: str.length > limit!,
    };
  };

  return (
    <BottomLayout title="About">
      <div>
        <div
          dangerouslySetInnerHTML={{
            __html: toggleEllipsis(desc ?? "", limit as number).Elements,
          }}
        />
        {/* <div className="linear-gradient w-full bottom-10">1</div> */}
        <span>
          {toggleEllipsis(desc ?? "", limit as number).isShowMore ? (
            <div
              className="text-[#fc72ff]  cursor-pointer hover:text-opacity-50 hover:text-[#fc72ff] hover:transition-all hover:duration-300"
              onClick={() => onClickMore(desc ?? "")}
            >
              Show more
            </div>
          ) : (
            <div
              className="text-[#fc72ff]  cursor-pointer hover:text-opacity-50 hover:text-[#fc72ff] hover:transition-all hover:duration-300"
              onClick={onClickClose}
            >
              Hide
            </div>
          )}
        </span>
      </div>
    </BottomLayout>
  );
};
